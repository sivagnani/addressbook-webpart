import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import Addressbook from './components/Addressbook';
import { IAddressbookProps } from './components/IAddressbookProps';

export interface IAddressbookWebPartProps {
  listName: string;
}

export default class AddressbookWebPart extends BaseClientSideWebPart<IAddressbookWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddressbookProps> = React.createElement(
      Addressbook,
      {
        spHttpClient:this.context.spHttpClient,
        siteUrl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
