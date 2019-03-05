"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const FeedbackTypes_1 = require("../models/FeedbackTypes");
class FeedbackPrompt extends botbuilder_dialogs_1.ConfirmPrompt {
    constructor() {
        super(FeedbackPrompt.ID);
        this.confirmChoices = [FeedbackTypes_1.FeedbackTypes.BAD, FeedbackTypes_1.FeedbackTypes.GOOD];
    }
}
FeedbackPrompt.ID = 'feedback_prompt';
exports.default = FeedbackPrompt;
//# sourceMappingURL=FeedbackPrompt.js.map