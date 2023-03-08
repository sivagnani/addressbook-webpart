import { Contact } from "../model";
import {SPHttpClient} from "@microsoft/sp-http";
export interface IServices{
    getContactById(contacts:Contact[],id:number):Contact;
    getContactsFromList(spHttpClient:SPHttpClient,siteUrl:string): Promise<Contact[]>;
    insertContact(spHttpClient:SPHttpClient,siteUrl:string,contact:Contact):Promise<boolean>;
    deleteContactById(spHttpClient:SPHttpClient,siteUrl:string,id:number):Promise<boolean>;
    updateContact(newContact:Contact,spHttpClient:SPHttpClient,siteUrl:string):Promise<boolean>;
}