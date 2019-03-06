import {
  ActivityTypes,
  TurnContext,
  ConversationState,
  UserState,
  StatePropertyAccessor,
} from 'botbuilder';
import { DialogSet, ConfirmPrompt, ChoicePrompt } from 'botbuilder-dialogs';
import QuestionDialog from './dialogs/QuestionDialog';
import FeedbackPrompt from './dialogs/FeedbackPrompt';
import lang from './lang';
import CorrectConceptPrompt from './dialogs/CorrectConceptPrompt';
import { ChannelId } from './models/ChannelIds';

const DIALOG_STATE_PROPERTY = 'dialog_state_prop';
export class CityBot {
  private readonly dialogState: StatePropertyAccessor<any>;
  private readonly dialogs: DialogSet;
  private readonly questionDialog: QuestionDialog;

  constructor(
    private conversationState: ConversationState,
    private userState: UserState,
  ) {
    this.dialogState = this.conversationState.createProperty(
      DIALOG_STATE_PROPERTY,
    );
    this.dialogs = new DialogSet(this.dialogState);

    // Add all dialogs
    this.questionDialog = new QuestionDialog(userState);
    [
      this.questionDialog,
      new FeedbackPrompt(),
      new ChoicePrompt('confirm_prompt'),
      new CorrectConceptPrompt(),
    ].forEach(dialog => {
      this.dialogs.add(dialog);
    });
  }

  async onTurn(turnContext: TurnContext) {
    const options = {
      [ActivityTypes.Message]: async () => {
        await this.handleDialog(turnContext);
      },
      [ActivityTypes.ConversationUpdate]: async () => {
        await this.welcomeUser(turnContext);
      },
      default: () => {
        console.log('Unknown activity type, not an error');
      },
    };
    await (options[turnContext.activity.type] || options.default)();
    await this.saveChanges(turnContext);
  }

  private async handleDialog(turnContext: TurnContext) {
    const dialogContext = await this.dialogs.createContext(turnContext);

    switch (turnContext.activity.channelId) {
      case ChannelId.Facebook:
        console.log(
          JSON.stringify(dialogContext.context.activity.channelData.postback),
        );
        await dialogContext.continueDialog();
        break;
      default:
        if (dialogContext.context.activity.value) {
          const payload = dialogContext.context.activity.value;
          await this.questionDialog.sendFile(dialogContext, payload);
          await dialogContext.repromptDialog();
        } else if (dialogContext.context.activity.text) {
          await dialogContext.continueDialog();
        }
        break;
    }

    // ? continue the multistep dialog that's already begun
    // ? won't do anything if there is no running dialog
    // if (
    //   checkNested(
    //     dialogContext.context.activity.channelData,
    //     'message',
    //     'quick_reply',
    //     'payload',
    //   )
    // ) {

    // }

    // ? if no outstanding dialog / no one responded
    if (!dialogContext.context.responded) {
      await dialogContext.beginDialog(QuestionDialog.ID);
    }
  }

  private async welcomeUser(turnContext: TurnContext) {
    // Do we have any new members added to the conversation?
    if (turnContext.activity.membersAdded.length !== 0) {
      // Iterate over all new members added to the conversation
      for (const idx in turnContext.activity.membersAdded) {
        // Greet anyone that was not the target (recipient) of this message.
        // Since the bot is the recipient for events from the channel,
        // context.activity.membersAdded === context.activity.recipient.Id indicates the
        // bot was added to the conversation, and the opposite indicates this is a user.
        if (
          turnContext.activity.membersAdded[idx].id !==
          turnContext.activity.recipient.id
        ) {
          // Send a "this is what the bot does" message to this user.
          await turnContext.sendActivity(lang.getStringFor(lang.WELCOME));
        }
      }
    }
  }
  private async saveChanges(tc: TurnContext) {
    await this.userState.saveChanges(tc);
    await this.conversationState.saveChanges(tc);
  }
}

function checkNested(obj: any, ...levels: string[]) {
  for (let i = 0; i < levels.length; i += 1) {
    if (!obj || !obj.hasOwnProperty(levels[i])) {
      return false;
    }
    // tslint:disable-next-line:no-parameter-reassignment
    obj = obj[levels[i]];
  }
  return true;
}
