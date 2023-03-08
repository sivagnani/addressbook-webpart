import * as React from "react";
import "./navBar.css";
import { INavBarProps, INavBarState } from "./INavBar";
import { NavLink } from "react-router-dom";
export default class NavBar extends React.Component<INavBarProps,INavBarState>{
    render(): React.ReactNode {
        return(
        <nav className="navigationBar">
        <div className="nav">
            <NavLink to={"/"} className={({isActive})=>isActive?"activeNav":"inActiveNav"}><div className={"navItem"} onClick={()=>{this.props.onNavClick(false)}}><p>HOME</p></div></NavLink>
            <NavLink to={"/add/Form"} className={({isActive})=>isActive?"activeNav":"inActiveNav"}><div className={"navItem"} onClick={()=>this.props.onNavClick(true)}><p>+ADD</p></div></NavLink>
        </div>
        <div>
            <img alt="No" src={require("../../assets/blog-icon.png")} className="icon"/>
        </div>
    </nav>);
    }
}