import { TurnContext, ConversationState, UserState } from 'botbuilder';
export declare class CityBot {
    private conversationState;
    private userState;
    private readonly dialogState;
    private readonly dialogs;
    private readonly questionDialog;
    constructor(conversationState: ConversationState, userState: UserState);
    onTurn(turnContext: TurnContext): Promise<void>;
    private handleDialog;
    private welcomeUser;
    private saveChanges;
}
