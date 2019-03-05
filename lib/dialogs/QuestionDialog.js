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
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const botbuilder_1 = require("botbuilder");
const CitynetApi_1 = require("../api/CitynetApi");
const FeedbackTypes_1 = require("../models/FeedbackTypes");
const lodash_1 = require("lodash");
const FeedbackPrompt_1 = require("./FeedbackPrompt");
const lang_1 = require("../lang");
const DocumentCard_1 = require("../models/DocumentCard");
const CorrectConceptPrompt_1 = require("./CorrectConceptPrompt");
const ConfirmTypes_1 = require("../models/ConfirmTypes");
const fs_1 = require("fs");
class QuestionDialog extends botbuilder_dialogs_1.WaterfallDialog {
    constructor(userState) {
        super(QuestionDialog.ID);
        this.docsAccessor = userState.createProperty('resolved_data');
        this.addStep(this.handleQuestion.bind(this));
        this.addStep(this.handleConcept.bind(this));
        this.addStep(this.handleFeedback.bind(this));
        this.addStep(this.handlePersonRequest.bind(this));
        this.api = new CitynetApi_1.default();
    }
    handleQuestion(sctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // ? Send the documents
            yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.WAIT_WHILE_FETCH));
            yield sctx.context.sendActivity({ type: botbuilder_1.ActivityTypes.Typing });
            const resolved = yield this.api.query(sctx.context.activity.text);
            // ? break when no documents were found
            if (resolved.documents.length <= 0) {
                yield sctx.endDialog();
                return yield this.waitFor(sctx, () => __awaiter(this, void 0, void 0, function* () {
                    yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.NO_DOCS_FOUND));
                    yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.MORE_QUESTIONS));
                }));
            }
            // ? save resolved documents to local storage
            yield this.docsAccessor.set(sctx.context, resolved);
            // ? ask if concept is correct
            if (!resolved.conceptsOfQuery) {
                console.log('no concepts, skipping question');
                yield sctx.next();
                return yield this.handleConcept(sctx, true);
            }
            yield this.waitFor(sctx, () => __awaiter(this, void 0, void 0, function* () {
                const formatConcepts = (conceptsArray) => conceptsArray
                    .map(concept => concept
                    .toLowerCase()
                    .split('_')
                    .join(' '))
                    .join(', ');
                yield sctx.prompt(CorrectConceptPrompt_1.default.ID, {
                    prompt: lang_1.default
                        .getStringFor(lang_1.default.ASK_CORRECT_CONCEPTS)
                        .replace('%1%', formatConcepts(resolved.conceptsOfQuery || [])),
                    retryPrompt: lang_1.default.getStringFor(lang_1.default.NOT_UNDERSTOOD_USE_BUTTONS),
                });
            }));
        });
    }
    handleConcept(sctx, skipped) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = sctx.context.activity.text;
            if (answer === ConfirmTypes_1.ConfirmTypes.POSITIVE || skipped) {
                const resolved = yield this.docsAccessor.get(sctx.context);
                const cards = lodash_1.map(lodash_1.sortBy(resolved.documents, 'scoreInPercent').reverse(), document => {
                    const documentCard = new DocumentCard_1.default()
                        .addTitle()
                        .addSummary(document)
                        .addConfidenceLevel(document)
                        .addAction(document);
                    return botbuilder_1.CardFactory.adaptiveCard(documentCard.card);
                });
                yield sctx.context.sendActivity(botbuilder_1.MessageFactory.carousel(cards));
                yield this.waitFor(sctx, () => __awaiter(this, void 0, void 0, function* () {
                    yield sctx.prompt(FeedbackPrompt_1.default.ID, {
                        prompt: lang_1.default.getStringFor(lang_1.default.USEFULLNESS_QUERY),
                        retryPrompt: lang_1.default.getStringFor(lang_1.default.NOT_UNDERSTOOD_USE_BUTTONS),
                    });
                }));
            }
            else if (answer === ConfirmTypes_1.ConfirmTypes.NEGATIVE) {
                yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.REPHRASE));
                yield sctx.endDialog();
            }
        });
    }
    handleFeedback(sctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = sctx.context.activity.text;
            if (answer === FeedbackTypes_1.FeedbackTypes.GOOD) {
                yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.THANK_FEEDBACK));
                yield this.waitFor(sctx, () => __awaiter(this, void 0, void 0, function* () {
                    yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.MORE_QUESTIONS));
                }));
                yield sctx.endDialog();
            }
            if (answer === FeedbackTypes_1.FeedbackTypes.BAD) {
                yield sctx.prompt('confirm_prompt', {
                    prompt: lang_1.default.getStringFor(lang_1.default.REAL_PERSON),
                    retryPrompt: lang_1.default.getStringFor(lang_1.default.NOT_UNDERSTOOD_USE_BUTTONS),
                    choices: [lang_1.default.POSITIVE, lang_1.default.NEGATIVE],
                });
            }
        });
    }
    askFeedback(sctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor(sctx, () => __awaiter(this, void 0, void 0, function* () {
                yield sctx.prompt(FeedbackPrompt_1.default.ID, {
                    prompt: lang_1.default.getStringFor(lang_1.default.USEFULLNESS_QUERY),
                    retryPrompt: lang_1.default.getStringFor(lang_1.default.NOT_UNDERSTOOD_USE_BUTTONS),
                });
            }));
        });
    }
    handlePersonRequest(sctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sctx.context.activity.text.toUpperCase() === lang_1.default.POSITIVE.toUpperCase()) {
                yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.EMAIL_SENT));
            }
            else {
                yield sctx.context.sendActivity(lang_1.default.getStringFor(lang_1.default.MORE_QUESTIONS));
            }
            yield sctx.endDialog();
        });
    }
    sendFile(dialogContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = dialogContext.context.activity.value.content;
            const filename = `${resourceUri.split('/').pop()}.pdf`;
            yield this.api.downloadFile(resourceUri, filename);
            const filedata = fs_1.readFileSync(`./downloads/${filename}`);
            const base64file = Buffer.from(filedata).toString('base64');
            const reply = {
                type: botbuilder_1.ActivityTypes.Message,
                attachments: [
                    {
                        name: filename,
                        contentUrl: `data:application/pdf;base64,${base64file}`,
                        contentType: 'application/pdf',
                    },
                ],
            };
            return yield dialogContext.context.sendActivity(reply);
        });
    }
    waitFor(sctx, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sctx.context.sendActivity({ type: botbuilder_1.ActivityTypes.Typing });
            return new Promise(resolve => {
                // wait 1 to 2 secs for natural feeling
                setTimeout(() => {
                    resolve(cb());
                }, Math.random() * 1000 + 1000);
            });
        });
    }
}
QuestionDialog.ID = 'question_dialog';
exports.default = QuestionDialog;
//# sourceMappingURL=QuestionDialog.js.map