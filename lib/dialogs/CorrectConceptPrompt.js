"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const ConfirmTypes_1 = require("../models/ConfirmTypes");
class CorrectConceptPrompt extends botbuilder_dialogs_1.ConfirmPrompt {
    constructor() {
        super(CorrectConceptPrompt.ID);
        this.confirmChoices = [ConfirmTypes_1.ConfirmTypes.POSITIVE, ConfirmTypes_1.ConfirmTypes.NEGATIVE];
    }
}
CorrectConceptPrompt.ID = 'correct_concept_prompt';
exports.default = CorrectConceptPrompt;
//# sourceMappingURL=CorrectConceptPrompt.js.map