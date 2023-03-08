import { Contact } from "../../model";
export default class Validation{
    emptyString:string =" \xa0 ";
    validate(type: string, input: string):string {
    switch (type) {
        case "name":
            return this.validateName(input);
        case "email":
            return this.validateMail(input);
        case "mobile":
            return this.validateMobile(input);
        case "landline":
            return this.validateLandline(input);
        case "website":
            return this.validateWebsite(input);
        case "address":
            return this.validateAddress(input);
    }
    return "error";
}
validateForm(contact:Contact){
    let errors:string[]=[this.validateName(contact.Name),this.validateMobile(contact.Mobile),this.validateMail(contact.Email),this.validateLandline(contact.Landline),this.validateWebsite(contact.Website),this.validateAddress(contact.Address)];
    let emptyErrorMessage:string[]=errors.filter((message)=>message.slice(0,6)==="Please");
    let invalidErrorMessage:string[]=errors.filter((message)=>message.slice(0,5)==="Enter");
    return (emptyErrorMessage.length!==0)?"Please fill all inputs":(invalidErrorMessage.length!==0)?"Enter valid inputs":this.emptyString;
}

validateName(input: string) {
    const validname = /^[a-zA-Z\s]{4,256}$/;
    return(this.required(input)
        ?(input.match(validname)?this.emptyString:"Enter valid name")
        :"Please Enter name")
}
validateMail(input: string) {
    const mail = /^[a-zA-Z0-9.$_*]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,}$/;
    return(this.required(input)
        ?(input.match(mail)?this.emptyString:"Enter valid email")
        :"Please Enter email")
}
validateMobile(input: string) {
    const mobile = /^[\+]+[0-9]{2,3}[\s]?[0-9]{3}[\s]?[0-9]{5,7}$/;
    return(this.required(input)
        ?(input.match(mobile)?this.emptyString:"Enter valid mobile number")
        :"Please Enter mobile number")
}
validateLandline(input: string) {
    const landline = /^[0][0-9]{2,3}[\s]?[0-9]{3,4}[\s]?[0-9]{4}$/;
    return(this.required(input)
        ?(input.match(landline)?this.emptyString:"Enter valid landline")
        :"Please Enter landline")
}
validateWebsite(input: string) {
    const website = /^(https?:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return(this.required(input)
        ?(input.match(website)?this.emptyString:"Enter valid website")
        :"Please Enter website")
}
validateAddress(input:string){
    return(this.required(input)?this.emptyString:"Please enter Address");
}
required(text: string) {
    if (text === "") {
        return false;
    }
    else {
        return true;
    }
}
}


// function validate(reg, id, input) {
//     if (this.required(input)) {
//         if (input.match(reg)) {
//             convertToHTMLElement(getElement(id)).innerHTML = "&nbsp;";
//             return true;
//         }
//         else {
//             convertToHTMLElement(getElement(id)).innerHTML = "Enter valid Input";
//             return false;
//         }
//     }
//     else {
//         convertToHTMLElement(getElement(id)).innerHTML = "Input is this.required";
//         return false;
//     }
// }
// function this.validateName() {
//     let name = convertToInputElement(getElement('newName')).value;
//     const validname = /^[a-zA-Z\s]{4,256}$/;
//     return validate(validname, 'nameError', name);
// }
// function validateEmail() {
//     let email = convertToInputElement(getElement("newEmail")).value;
//     const mail = /^[a-zA-Z0-9.$_*]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]{2,}$/;
//     return validate(mail, 'emailError', email);
// }
// function this.validateMobile() {
//     let mobile = convertToInputElement(getElement('newMobile')).value;
//     const valid = /^[\+]+[0-9]{2,3}[\s]?[0-9]{3}[\s]?[0-9]{5,7}$/;
//     return validate(valid, 'mobileError', mobile);
// }
// function this.validateLandline() {
//     let landline = convertToInputElement(getElement('newLandline')).value;
//     const valid = /^[0][0-9]{2,3}[\s]?[0-9]{3,4}[\s]?[0-9]{4}$/;
//     return validate(valid, 'landlineError', landline);
// }
// function this.validateWebsite() {
//     let website = convertToInputElement(getElement('newWebsite')).value;
//     const valid = /^([https|http]:)?\/?\/?(www.)+[a-zA-Z0-9#!:?+=&%!.\-\/]+\.([a-zA-Z]+){2,}$/;
//     return validate(valid, 'websiteError', website);
// }
// function this.validateAddress() {
//     let address = convertToInputElement(getElement('newAddress')).value;
//     if (this.required(address)) {
//         convertToHTMLElement(getElement('addressError')).innerHTML = "&nbsp;";
//         return true;
//     }
//     else {
//         convertToHTMLElement(getElement('addressError')).innerHTML = "Address is this.required";
//         return false;
//     }
// }
// function validateForm() {
//     let name = this.validateName();
//     let email = validateEmail();
//     let mobile = this.validateMobile();
//     let landline = this.validateLandline();
//     let website = this.validateWebsite();
//     let address = this.validateAddress();
//     return (name && email && mobile && landline && website && address);
// }