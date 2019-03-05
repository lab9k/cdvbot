import { Document } from './QueryResponse';
import { AdaptiveCard } from 'adaptivecards';
export default class DocumentCard {
    private readonly internalCard;
    constructor();
    addTitle(title?: string): DocumentCard;
    addSummary(document: Document): DocumentCard;
    addConfidenceLevel(document: Document): DocumentCard;
    addAction(document: Document): DocumentCard;
    readonly card: AdaptiveCard;
    private getConfidenceColor;
}
