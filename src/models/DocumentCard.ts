import { Document } from './QueryResponse';
import { HeroCard, CardAction, CardImage } from 'botbuilder';
import {
  AdaptiveCard,
  TextBlock,
  TextSize,
  TextColor,
  SubmitAction,
} from 'adaptivecards';
import { take } from 'lodash';
import lang from '../lang';
export default class DocumentCard implements HeroCard {
  title: string;
  subtitle: string;
  text: string;
  images: CardImage[];
  buttons: CardAction[];
  tap: CardAction;

  constructor() {}

  public addTitle(title: string = 'Document'): DocumentCard {
    const titleText = new TextBlock();
    titleText.size = TextSize.Large;
    titleText.text = title;
    this.title = title;
    return this;
  }
  public addSummary(document: Document): DocumentCard {
    const summaryText = new TextBlock();
    summaryText.size = TextSize.Default;
    const text = `${take(document.summary.split(' '), 50).join(' ')}...`;
    this.text = text;
    return this;
  }
  public addConfidenceLevel(document: Document): DocumentCard {
    const confidenceLevel = new TextBlock();
    const text = `Confidence: ${document.scoreInPercent}`;
    confidenceLevel.text = text;
    confidenceLevel.size = TextSize.Small;
    confidenceLevel.color = this.getConfidenceColor(document.scoreInPercent);
    this.text += `\n${text}`;
    return this;
  }
  public addAction(document: Document): DocumentCard {
    const action = new SubmitAction();
    action.data = { content: document.resourceURI };
    action.title = lang.getStringFor(lang.READ_MORE);
    this.tap = null;
    return this;
  }
  public get card() {
    return this;
  }

  private getConfidenceColor(level: number): TextColor {
    return level < 30
      ? TextColor.Warning
      : level < 60
      ? TextColor.Attention
      : TextColor.Good;
  }
}
