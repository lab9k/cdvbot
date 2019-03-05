import { WaterfallDialog, DialogContext } from 'botbuilder-dialogs';
import { UserState } from 'botbuilder';
export default class QuestionDialog extends WaterfallDialog {
    static readonly ID = "question_dialog";
    private readonly api;
    private readonly docsAccessor;
    constructor(userState: UserState);
    private handleQuestion;
    private handleConcept;
    private handleFeedback;
    askFeedback(sctx: DialogContext): Promise<any>;
    private handlePersonRequest;
    sendFile(dialogContext: DialogContext): Promise<any>;
    private waitFor;
}
