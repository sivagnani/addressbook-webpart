import Main from "./main";
import { IAddressbookProps } from "../IAddressbookProps";
import { useNavigate } from "react-router-dom";
import * as React from "react";
export function APPWithRouter(props:IAddressbookProps){
    const navigate=useNavigate();
    return(<Main navigate={navigate} {...props}></Main>)
  }