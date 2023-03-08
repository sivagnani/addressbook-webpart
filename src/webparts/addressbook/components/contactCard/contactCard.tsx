import "./contactCard.css";
import { IContactCardProps,IContactCardState} from "./IContactCard";
import * as React from "react";
export default class contactCard extends React.Component<IContactCardProps,IContactCardState>{
    render(): React.ReactNode {
        return(
            <div className={"eachContactSummary"}>
                <h1 className="Name">{this.props.contact.Name}</h1>
                <p className="Mail details">{this.props.contact.Email}</p>
                <p className="Mobile details">{this.props.contact.Mobile}</p>
            </div>
        );
    }
}