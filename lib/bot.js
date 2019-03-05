"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const QuestionDialog_1 = require("./dialogs/QuestionDialog");
const FeedbackPrompt_1 = require("./dialogs/FeedbackPrompt");
const lang_1 = require("./lang");
const CorrectConceptPrompt_1 = require("./dialogs/CorrectConceptPrompt");
const DIALOG_STATE_PROPERTY = 'dialog_state_prop';
class CityBot {
    constructor(conversationState, userState) {
        this.conversationState = conversationState;
        this.userState = userState;
        this.dialogState = this.conversationState.createProperty(DIALOG_STATE_PROPERTY);
        this.dialogs = new botbuilder_dialogs_1.DialogSet(this.dialogState);
        // Add all dialogs
        this.questionDialog = new QuestionDialog_1.default(userState);
        [
            this.questionDialog,
            new FeedbackPrompt_1.default(),
            new botbuilder_dialogs_1.ChoicePrompt('confirm_prompt'),
            new CorrectConceptPrompt_1.default(),
        ].forEach(dialog => {
            this.dialogs.add(dialog);
        });
    }
    onTurn(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                [botbuilder_1.ActivityTypes.Message]: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.handleDialog(turnContext);
                }),
                [botbuilder_1.ActivityTypes.ConversationUpdate]: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.welcomeUser(turnContext);
                }),
                default: () => {
                    throw 'Unknown activity type';
                },
            };
            yield (options[turnContext.activity.type] || options.default)();
            yield this.saveChanges(turnContext);
        });
    }
    handleDialog(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogContext = yield this.dialogs.createContext(turnContext);
            // ? continue the multistep dialog that's already begun
            // ? won't do anything if there is no running dialog
            if (dialogContext.context.activity.text) {
                yield dialogContext.continueDialog();
            }
            else if (dialogContext.context.activity.value) {
                yield this.questionDialog.sendFile(dialogContext);
                yield dialogContext.repromptDialog();
            }
            // ? if no outstanding dialog / no one responded
            if (!dialogContext.context.responded) {
                yield dialogContext.beginDialog(QuestionDialog_1.default.ID);
            }
        });
    }
    welcomeUser(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Do we have any new members added to the conversation?
            if (turnContext.activity.membersAdded.length !== 0) {
                // Iterate over all new members added to the conversation
                for (const idx in turnContext.activity.membersAdded) {
                    // Greet anyone that was not the target (recipient) of this message.
                    // Since the bot is the recipient for events from the channel,
                    // context.activity.membersAdded === context.activity.recipient.Id indicates the
                    // bot was added to the conversation, and the opposite indicates this is a user.
                    if (turnContext.activity.membersAdded[idx].id !==
                        turnContext.activity.recipient.id) {
                        // Send a "this is what the bot does" message to this user.
                        yield turnContext.sendActivity(lang_1.default.getStringFor(lang_1.default.WELCOME));
                    }
                }
            }
        });
    }
    saveChanges(tc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userState.saveChanges(tc);
            yield this.conversationState.saveChanges(tc);
        });
    }
}
exports.CityBot = CityBot;
//# sourceMappingURL=bot.js.map