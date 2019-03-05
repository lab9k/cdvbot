import { Document } from './QueryResponse';
import { HeroCard, CardAction, CardImage } from 'botbuilder';
export default class DocumentCard implements HeroCard {
    title: string;
    subtitle: string;
    text: string;
    images: CardImage[];
    buttons: CardAction[];
    tap: CardAction;
    constructor();
    addTitle(title?: string): DocumentCard;
    addSummary(document: Document): DocumentCard;
    addConfidenceLevel(document: Document): DocumentCard;
    addAction(document: Document): DocumentCard;
    readonly card: this;
    private getConfidenceColor;
}
