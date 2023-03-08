import * as React from 'react';
import { IAddressbookProps } from './IAddressbookProps';
import { HashRouter } from 'react-router-dom';
import { APPWithRouter } from './Main/appWithRouter';

export default class Addressbook extends React.Component<IAddressbookProps, {}> {
  public render(): React.ReactElement<IAddressbookProps> {
    return (
      <HashRouter>
        <APPWithRouter {...this.props}/>
      </HashRouter>
    );
  }
}
