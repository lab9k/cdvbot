"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.default = new class {
    constructor() {
        this.WELCOME = 'welcome';
        this.WAIT_WHILE_FETCH = 'wait_while_fetch';
        this.NO_DOCS_FOUND = 'no_docs_found';
        this.NOT_UNDERSTOOD_USE_BUTTONS = 'NOT_UNDERSTOOD_USE_BUTTONS';
        this.USEFULLNESS_QUERY = 'USEFULLNESS_QUERY';
        this.MORE_QUESTIONS = 'more_questions';
        this.THANK_FEEDBACK = 'thank_feedback';
        this.REAL_PERSON = 'real_person';
        this.EMAIL_SENT = 'email_sent';
        this.POSITIVE = 'Ja';
        this.NEGATIVE = 'Nee';
        this.READ_MORE = 'lees_meer';
        this.ASK_CORRECT_CONCEPTS = 'ask_correct_concepts';
        this.REPHRASE = 'rephrase_question';
        this.options = {
            [this.WELCOME]: [
                `Hallo!
      Ik ben een bot, mij kan je verschillende vragen stellen over e-besluitvorming in Gent.`,
                `Ik ben een bot die je vragen kan stellen over e-besluitvorming in Gent`,
            ],
            [this.WAIT_WHILE_FETCH]: [
                `Even geduld terwijl ik de juiste documenten zoek.`,
                'Ok, ik zal even gaan zoeken naar de juiste documenten.',
            ],
            [this.NO_DOCS_FOUND]: [
                `Helaas heb ik niets teruggevonden.`,
                'Hier heb ik geen enkel document over gevonden.',
                'Jammer genoeg vind ik niets terug.',
            ],
            [this.NOT_UNDERSTOOD_USE_BUTTONS]: [
                'Dat heb ik niet verstaan. Gelieve de knoppen te gebruiken.',
                'Wat?',
            ],
            [this.USEFULLNESS_QUERY]: [
                'Waren deze documenten nuttig?',
                'Wat vond je van deze documenten?',
            ],
            [this.REAL_PERSON]: [
                'Wil je dat ik een echte persoon haal?',
                'Als je wil kan ik er een echte persoon bij halen. Goed?',
            ],
            [this.EMAIL_SENT]: [
                'Ok, ik heb de vraag behandeld, er komt binnenkort iemand op terug.',
                'Ok, ik heb een mail verzonden. Binnekort word deze behandeld door een echte persoon.',
            ],
            [this.THANK_FEEDBACK]: [
                'Bedankt voor de feedback!',
                'Merci! Door deze feedback word ik alleen maar slimmer.',
            ],
            [this.MORE_QUESTIONS]: [
                'Heb je nog meer vragen? Wees niet bang om ze hier te stellen.',
                'Indien je nog vragen hebt, kan je ze hier stellen.',
            ],
            [this.READ_MORE]: ['Download pdf'],
            [this.ASK_CORRECT_CONCEPTS]: [
                'Ik heb documenten teruggevonden over: "%1%", is dit correct?',
                'Ik heb een jouw vraag gelinkt aan de volgende concepten:\n"%1%"\nKlopt dit?',
            ],
            [this.REPHRASE]: [
                'Kan je de vraag op een andere manier stellen zodat ik in het juiste domein ga zoeken?',
                'Gelieve de vraag iets specifieker te maken, zodat ik op de juiste plek ga zoeken',
            ],
            default: [],
        };
    }
    // private get data() {
    //   return <any>data;
    // }
    getStringFor(key) {
        return lodash_1.sample(this.options[key] || this.options.default);
    }
}();
//# sourceMappingURL=index.js.map