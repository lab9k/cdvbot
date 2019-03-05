declare const _default: {
    readonly WELCOME: "welcome";
    readonly WAIT_WHILE_FETCH: "wait_while_fetch";
    readonly NO_DOCS_FOUND: "no_docs_found";
    readonly NOT_UNDERSTOOD_USE_BUTTONS: "NOT_UNDERSTOOD_USE_BUTTONS";
    readonly USEFULLNESS_QUERY: "USEFULLNESS_QUERY";
    readonly MORE_QUESTIONS: "more_questions";
    readonly THANK_FEEDBACK: "thank_feedback";
    readonly REAL_PERSON: "real_person";
    readonly EMAIL_SENT: "email_sent";
    readonly POSITIVE: "Ja";
    readonly NEGATIVE: "Nee";
    readonly READ_MORE: "lees_meer";
    readonly ASK_CORRECT_CONCEPTS: "ask_correct_concepts";
    readonly REPHRASE: "rephrase_question";
    options: {
        [this.WELCOME]: string[];
        [this.WAIT_WHILE_FETCH]: string[];
        [this.NO_DOCS_FOUND]: string[];
        [this.NOT_UNDERSTOOD_USE_BUTTONS]: string[];
        [this.USEFULLNESS_QUERY]: string[];
        [this.REAL_PERSON]: string[];
        [this.EMAIL_SENT]: string[];
        [this.THANK_FEEDBACK]: string[];
        [this.MORE_QUESTIONS]: string[];
        [this.READ_MORE]: string[];
        [this.ASK_CORRECT_CONCEPTS]: string[];
        [this.REPHRASE]: string[];
        default: any[];
    };
    getStringFor(key: string): string;
};
export default _default;
