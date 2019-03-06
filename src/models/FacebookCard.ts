import { Document } from './QueryResponse';
import { take } from 'lodash';

interface FacebookData {
  channelData: {
    attachment: {
      type: string;
      payload: { template_type: string; elements: any[] };
    };
  };
}

export class FacebookCardBuilder {
  private data: FacebookData;
  constructor() {
    this.data = {
      channelData: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [],
          },
        },
      },
    };
  }

  public addCard(card: FacebookCard) {
    this.data.channelData.attachment.payload.elements.push(card.getCard());
  }

  public getData(): any {
    return this.data;
  }
}

interface DefaultAction {
  type: string;
  title: string;
  payload: any;
}

export class FacebookCard {
  private buttons: DefaultAction[];
  constructor(
    private title: string,
    private subtitle: string,
    private defaultAction: DefaultAction,
    ...buttons: DefaultAction[]
  ) {
    this.buttons = buttons;
  }
  getCard() {
    return {
      title: this.title,
      subtitle: this.subtitle,
      default_action: this.defaultAction,
      buttons: this.buttons,
    };
  }
}
