import * as  React from "react";
import "./contactSummary.css";
import ContactCard from "../contactCard/contactCard";
import { IContactSummaryProps, IContactSummaryState } from "./IContactSummary";
import { NavLink } from "react-router-dom";
export default class ContactSummary extends React.Component<IContactSummaryProps, IContactSummaryState>{
    render() {
        return <div className="contactSummary" id="summary">
            <p className="contact">CONTACTS</p>
            {this.props.contactList.map((contact) => {
                return <NavLink to={"/details/"+contact.Id} className={({isActive})=>isActive?"activeCard":"inActiveCard"}>
                    <ContactCard key={contact.Id} contact={contact}/>
                    </NavLink>
            })
            }
        </div>;
    }
}