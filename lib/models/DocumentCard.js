"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adaptivecards_1 = require("adaptivecards");
const lodash_1 = require("lodash");
const lang_1 = require("../lang");
class DocumentCard {
    constructor() {
        this.internalCard = new adaptivecards_1.AdaptiveCard();
    }
    addTitle(title = 'Document') {
        const titleText = new adaptivecards_1.TextBlock();
        titleText.size = adaptivecards_1.TextSize.Large;
        titleText.text = title;
        this.internalCard.addItem(titleText);
        return this;
    }
    addSummary(document) {
        const summaryText = new adaptivecards_1.TextBlock();
        summaryText.size = adaptivecards_1.TextSize.Default;
        summaryText.text = `${lodash_1.take(document.summary.split(' '), 50).join(' ')}...`;
        this.internalCard.addItem(summaryText);
        return this;
    }
    addConfidenceLevel(document) {
        const confidenceLevel = new adaptivecards_1.TextBlock();
        confidenceLevel.text = `Confidence: ${document.scoreInPercent}`;
        confidenceLevel.size = adaptivecards_1.TextSize.Small;
        confidenceLevel.color = this.getConfidenceColor(document.scoreInPercent);
        this.internalCard.addItem(confidenceLevel);
        return this;
    }
    addAction(document) {
        const action = new adaptivecards_1.SubmitAction();
        action.data = { content: document.resourceURI };
        action.title = lang_1.default.getStringFor(lang_1.default.READ_MORE);
        this.internalCard.addAction(action);
        return this;
    }
    get card() {
        return this.internalCard;
    }
    getConfidenceColor(level) {
        return level < 30
            ? adaptivecards_1.TextColor.Warning
            : level < 60
                ? adaptivecards_1.TextColor.Attention
                : adaptivecards_1.TextColor.Good;
    }
}
exports.default = DocumentCard;
//# sourceMappingURL=DocumentCard.js.map