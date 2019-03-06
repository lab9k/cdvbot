import { Document } from './QueryResponse';
import { take } from 'lodash';
export default class FacebookCard {
  constructor(private document: Document) {}
  public getData(): any {
    return {
      channelData: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                title: 'Document',
                subtitle: `${take(this.document.summary.split(' '), 50).join(
                  ' ',
                )}...`,
                image_url:
                  'https://static01.nyt.com/images/2019/02/10/travel/03updat' +
                  'e-snowfall2/03update-snowfall2-jumbo.jpg?quality=90&auto=webp',
                default_action: {
                  type: 'web_url',
                  url:
                    'https://www.nytimes.com/2019/02/08/travel/ski-resort-snow-conditions.html',
                  messenger_extensions: false,
                  webview_height_ratio: 'tall',
                },
                buttons: [
                  {
                    type: 'element_share',
                  },
                ],
              },
            ],
          },
        },
      },
    };
  }
}
