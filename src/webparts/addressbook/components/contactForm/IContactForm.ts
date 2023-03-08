import { Contact } from "../../model";
export interface IContactFormProps{
    contactList:Contact[];
    contact:Contact;
    action:boolean;
    params:{id:string};
    operation:(contact:Contact)=>void;
}
export interface IContactFormState{
    contact:Contact;
    nameError:string;
    mobileError:string;
    emailError:string;
    landlineError:string;
    websiteError:string;
    addressError:string;
    formError:string;
    isAdd:boolean;
    shouldValidate:boolean;
    isMounted:boolean;
}