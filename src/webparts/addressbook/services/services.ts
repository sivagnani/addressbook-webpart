import { Contact } from '../model';
import { IServices } from './IServices';
import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http";
export class Services implements IServices{
    getContactById(contacts:Contact[],id:number):Contact{
        return contacts.filter((contact)=>contact.Id===id)[0];
    }
    insertContact(spHttpClient:SPHttpClient,siteUrl:string,contact:Contact):Promise<boolean>{
        return spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items?$select=Id,Name,Email,Mobile,Landline,Website,Address`,SPHttpClient.configurations.v1,{
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': ''
            },
            body:JSON.stringify(contact)
        }).then((response:SPHttpClientResponse):boolean=>response.ok)
    }
    getContactsFromList(spHttpClient:SPHttpClient,siteUrl:string): Promise<Contact[]>{
        return spHttpClient.get(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items?$select=Id,Name,Email,Mobile,Landline,Website,Address`,SPHttpClient.configurations.v1,{
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
            }
            }).then((response:SPHttpClientResponse)=>{
                return response.json()}).then((response):Contact[]=>{
                    return response.value})
    }
    updateContact(newContact:Contact,spHttpClient:SPHttpClient,siteUrl:string):Promise<boolean>{
        return spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items(${newContact.Id})`,SPHttpClient.configurations.v1,{
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': '',
            'X-HTTP-Method':'MERGE',
            'IF-MATCH': '*'
            },
            body:JSON.stringify(newContact)
        }).then((response:SPHttpClientResponse):boolean=>{
            return response.ok;
        })
    }
   deleteContactById(spHttpClient:SPHttpClient,siteUrl:string,id:number):Promise<boolean>{
        return spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items(${id})`,SPHttpClient.configurations.v1,{
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': '',
            'X-HTTP-Method':'DELETE',
            'IF-MATCH': '*'
            },
        }).then((response:SPHttpClientResponse):boolean=>{
            return response.ok;
        })
    }    
}
