import * as  React from "react";
import "./contactInfo.css";
import { IContactInfoProps, IContactInfoState } from "./IContactInfo";
import { Link} from "react-router-dom";
import { Services } from "../../services/services";
import { Contact } from "../../model";
import withRouter from "../withRouter.js";
import { emptyContact } from "../../constants";
class ContactInfo extends React.Component<IContactInfoProps, IContactInfoState>{
    service = new Services();
    constructor(props: IContactInfoProps){
        super(props);
        this.state={
            isMounted:false,
            contact:emptyContact,
        }
    }
    componentDidMount(): void {
        if(!this.state.isMounted){
            let contact:Contact=this.service.getContactById(this.props.contactList,parseInt(this.props.params.id,10));
            this.setState({contact:contact,isMounted:true});
        }
    }
    componentDidUpdate(prevProps: Readonly<IContactInfoProps>, prevState: Readonly<IContactInfoState>, snapshot?: any): void {
        if(prevProps!==this.props){
            let contact:Contact=this.service.getContactById(this.props.contactList,parseInt(this.props.params.id,10));
            this.setState({contact:contact});
        }
    }
    render() {
        return (<div className="contactInfo">
            <div className="nameSection">
                <h1 className="name">{this.state.contact.Name}</h1>
                <div className="center">
                    <div className="modifySection">
                        <Link to={"/add/"+this.state.contact.Id} >
                        <div className="modify" onClick={() => this.props.edit()}>
                            <img alt="" className="editSymbol" src={require("../../assets/edit1.jpg")} />
                            <p className="btn">EDIT</p>
                        </div>
                        </Link>
                        <div className="modify" onClick={() => this.props.delete(this.state.contact.Id)}>
                            <img alt="" className="deleteSymbol" src={require("../../assets/delete2.png")} />
                            <p className="btn">DELETE</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="details">
                <div className="content"><p>Email:</p><pre>{this.state.contact.Email}</pre></div>
                <div className="content"><p>Mobile:</p><pre>{this.state.contact.Mobile}</pre></div>
                <div className="content"><p>Landline:</p><pre>{this.state.contact.Landline}</pre></div>
                <div className="content"><p>Website:</p><pre>{this.state.contact.Website}</pre></div>
                <div className="content"><p>Address:</p><pre>{this.state.contact.Address}</pre></div>
            </div>
        </div>);
    }
}
export default withRouter(ContactInfo);