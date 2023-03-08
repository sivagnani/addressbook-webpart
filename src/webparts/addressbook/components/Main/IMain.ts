import { NavigateFunction } from "react-router";
import { Contact } from "../../model";
import {SPHttpClient} from "@microsoft/sp-http";
export interface IRouterState{
    contactList: Contact[];
    activeContact:Contact;
    showContactInfo:boolean;
    showForm:boolean;
    isInitialPage:boolean;
    editForm:boolean
}
export interface IRouterProps{
    navigate:NavigateFunction;
    spHttpClient:SPHttpClient;
    siteUrl:string;
}