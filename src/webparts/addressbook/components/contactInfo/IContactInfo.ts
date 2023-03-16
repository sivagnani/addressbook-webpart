import { Contact } from "../../model";
export interface IContactInfoProps{
    contactList:Contact[];
    params:{id:string};
    delete:(id:number)=>void;
    edit:()=>void;
}
export interface IContactInfoState{
    contact:Contact;
}