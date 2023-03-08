import { Contact } from '../model';
import { IServices } from './IServices';
import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http";
export class Services implements IServices{
    getContactById(contacts:Contact[],id:number):Contact{
        return contacts.filter((contact)=>contact.Id===id)[0];
    }
    async insertContact(spHttpClient:SPHttpClient,siteUrl:string,contact:Contact):Promise<boolean>{
        return await spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items?$select=Id,Name,Email,Mobile,Landline,Website,Address`,SPHttpClient.configurations.v1,{
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': ''
            },
            body:JSON.stringify(contact)
        }).then((response:SPHttpClientResponse):boolean=>response.ok)
    }
    async getContactsFromList(spHttpClient:SPHttpClient,siteUrl:string): Promise<Contact[]>{
        return await spHttpClient.get(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items?$select=Id,Name,Email,Mobile,Landline,Website,Address`,SPHttpClient.configurations.v1,{
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
            }
            }).then((response:SPHttpClientResponse)=>{
                return response.json()}).then((response):Promise<Contact[]>=>{
                    return response.value})
    }
    async updateContact(newContact:Contact,spHttpClient:SPHttpClient,siteUrl:string):Promise<boolean>{
        return await spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items(${newContact.Id})`,SPHttpClient.configurations.v1,{
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
    async deleteContactById(spHttpClient:SPHttpClient,siteUrl:string,id:number):Promise<boolean>{
        return await spHttpClient.post(`${siteUrl}/_api/web/lists/getbytitle('Contacts')/items(${id})`,SPHttpClient.configurations.v1,{
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
