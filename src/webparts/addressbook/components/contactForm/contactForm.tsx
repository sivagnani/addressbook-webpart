import * as React from "react";
import "./contactForm.css";
import { IContactFormProps, IContactFormState } from "./IContactForm";
import { emptyContact } from "../../constants";
import Validation from "./validations";
import { Contact } from "../../model";
import { Link} from "react-router-dom";
import { Services } from "../../services/services";
import withRouter from "../withRouter.js";
class ContactForm extends React.Component<IContactFormProps, IContactFormState>{
    private errorRef = React.createRef<HTMLHeadingElement>();
    service = new Services();
    validation = new Validation();
    constructor(props: IContactFormProps) {
        super(props);
        this.state = {
            contact: props.contact,
            nameError: "\xa0",
            mobileError: "\xa0",
            emailError: "\xa0",
            landlineError: "\xa0",
            websiteError: "\xa0",
            addressError: "\xa0",
            formError: "\xa0",
            isAdd: !props.action,
            shouldValidate: false,
            isMounted: false,
        }
    }
    moveToTop() {
        this.errorRef.current?.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    validate() {
        let newContact: Contact = this.state.contact;
        let error: string = (this.validation.validateForm(newContact));
        this.setState({ formError: error, shouldValidate: true },
            () => {
                return (this.state.formError === " \xa0 ") && this.props.operation(newContact)
            });
        this.moveToTop();
    }
    async handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        let id: string = event.target.id;
        let value: string = event.target.value;
        let error: string = await this.validation.validate(id, value);
        let duplicateContact: Contact = { ...this.state.contact }
        let errorMessage: string;
        switch (id) {
            case "name":
                duplicateContact.Name = value;
                errorMessage = await this.validation.validateForm(duplicateContact);
                this.setState({
                    nameError: error,
                    contact: duplicateContact,
                    formError: errorMessage
                });
                break;
            case "email":
                duplicateContact.Email = value;
                errorMessage = await this.validation.validateForm(duplicateContact);
                this.setState({
                    emailError: error,
                    contact: duplicateContact,
                    formError: errorMessage
                });
                break;
            case "mobile":
                duplicateContact.Mobile = value;
                errorMessage = await this.validation.validateForm(duplicateContact);
                this.setState({
                    mobileError: error,
                    contact: duplicateContact,
                    formError: errorMessage
                });
                break;
            case "landline":
                duplicateContact.Landline = value;
                errorMessage = await this.validation.validateForm(duplicateContact);
                this.setState({
                    landlineError: error,
                    contact: duplicateContact,
                    formError: errorMessage
                });
                break;
            case "website":
                duplicateContact.Website = value;
                errorMessage = await this.validation.validateForm(duplicateContact);
                this.setState({
                    websiteError: error,
                    contact: duplicateContact,
                    formError: errorMessage
                });
                break;
            case "address":
                duplicateContact.Address = value;
                errorMessage = await this.validation.validateForm(duplicateContact);
                this.setState({
                    addressError: error,
                    contact: duplicateContact,
                    formError: errorMessage
                });
                break;
        }
    }
    resetForm() {
        this.setState({
            contact: this.props.contact,
            nameError: "\xa0",
            mobileError: "\xa0",
            emailError: "\xa0",
            landlineError: "\xa0",
            websiteError: "\xa0",
            addressError: "\xa0",
            formError: "\xa0",
            isAdd: !this.props.action,
        });
        this.moveToTop();
    }
    componentDidMount(): void {
        if (!this.state.isMounted) {
            if (this.props.params.id!=="Form") {
                let contact: Contact = this.service.getContactById(this.props.contactList, parseInt(this.props.params.id,10));
                this.setState({
                    contact: contact,
                    nameError: "\xa0",
                    mobileError: "\xa0",
                    emailError: "\xa0",
                    landlineError: "\xa0",
                    websiteError: "\xa0",
                    addressError: "\xa0",
                    formError: "\xa0",
                    isAdd: !this.props.action,
                    isMounted: true,
                });
            }
        }
    }
    componentDidUpdate(prevProps: IContactFormProps) {
        if (prevProps !== this.props) {
            this.setState({
                contact: this.props.contact,
                nameError: "\xa0",
                mobileError: "\xa0",
                emailError: "\xa0",
                landlineError: "\xa0",
                websiteError: "\xa0",
                addressError: "\xa0",
                formError: "\xa0",
                isAdd: !this.props.action,
                isMounted: true,
            });
        }
    }
    render(): React.ReactNode {
        return (
            <div className="addForm">
                <form className="detailsForm">
                    <div className="formHeader">
                        <h3 className="formError" id="formError" ref={this.errorRef}>{this.state.shouldValidate && this.state.formError}</h3>
                        <Link to={this.props.contact === emptyContact ? "/" : "/details/" + this.props.contact.Id}><img alt="" className="closeIcon" src={require("../../assets/close.png")} /></Link>
                    </div>
                    <div className="inputField">
                        <label>Name <sup>*</sup></label>
                        <input type="text" id="name" onChange={(event) => this.handleInputChange(event)} value={this.state.contact.Name} />
                        <p className="error">{this.state.nameError}</p>
                    </div>
                    <div className="inputField">
                        <label>Email <sup>*</sup></label>
                        <input type="text" id="email" onChange={(event) => this.handleInputChange(event)} value={this.state.contact.Email} />
                        <p className="error">{this.state.emailError}</p>
                    </div>
                    <div className="inputField smallField">
                        <div className="smallInputField">
                            <label>Mobile <sup>*</sup></label>
                            <input className="smallInputField" type="text" id="mobile" onChange={(event) => this.handleInputChange(event)} value={this.state.contact.Mobile} />
                            <p className="error">{this.state.mobileError}</p>
                        </div>
                        <div className="smallInputField">
                            <label>Landline <sup>*</sup></label>
                            <input className="smallInputField" type="text" id="landline" onChange={(event) => this.handleInputChange(event)} value={this.state.contact.Landline} />
                            <p className="error">{this.state.landlineError}</p>
                        </div>
                    </div>
                    <div className="inputField">
                        <label>Website <sup>*</sup></label>
                        <input type="text" id="website" onChange={(event) => this.handleInputChange(event)} value={this.state.contact.Website} />
                        <p className="error">{this.state.websiteError}</p>
                    </div>
                    <div className="inputField">
                        <label>Address <sup>*</sup></label>
                        <textarea className="address" id="address" onChange={(event) => this.handleInputChange(event)} value={this.state.contact.Address}></textarea>
                        <p className="error">{this.state.addressError}</p>
                    </div>
                    <div className="submitField">
                        <input type="button" className="addbtn" value="Reset" onClick={() => this.resetForm()} />
                        <input type="button" className="addbtn" value={this.state.isAdd ? "Add" : "Update"} onClick={() => this.validate()} />
                    </div>
                </form>
            </div>
        );

    }
}
export default withRouter(ContactForm);