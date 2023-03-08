import * as React from 'react';
import './main.css';
import ContactSummary from '../contactSummary/contactSummary';
import {AddressHeader} from '../pageHeader/header';
import NavBar from '../pageNavBar/navBar';
import ContactInfo from '../contactInfo/contactInfo';
import ContactForm from '../contactForm/contactForm';
import { IRouterProps,IRouterState } from './IMain';
import { Contact } from '../../model';
import { Services} from '../../services/services';
import { emptyContact } from '../../constants';
import {  Route, Routes} from 'react-router-dom';
class Main extends React.Component<IRouterProps,IRouterState>{
  service = new Services();
  constructor(props:IRouterProps){
    super(props);
    this.state={
    contactList: [],
    activeContact:emptyContact,
    showContactInfo:false,
    showForm:false,
    isInitialPage:true,
    editForm:false
    }
  }
  componentDidMount(): void {
    this.service.getContactsFromList(this.props.spHttpClient,this.props.siteUrl).then(contacts=>{
      this.setState({
        contactList:contacts,
      })
    })
    }
  handleForm(showAddForm:boolean):void{
    this.setState({
      showContactInfo:false,
      editForm:false,
      showForm:showAddForm,
      isInitialPage:!showAddForm,
      activeContact:emptyContact
    });
  }
  deleteContact(id:number):void{
    this.service.deleteContactById(this.props.spHttpClient,this.props.siteUrl,id).then(
      (isContactDeleted:boolean)=>{
        if(isContactDeleted){
          this.service.getContactsFromList(this.props.spHttpClient,this.props.siteUrl).then(contacts=>{
            this.setState({
              contactList:contacts,
              showContactInfo:false
            });
            alert("Contact Deleted Successfully");
          })
        }
        else{
          alert("Error in Deleting Contact");
        }
        this.props.navigate("/");
      }
    )
  }
  handleEdit():void{
    this.setState({
      showContactInfo:false,
      showForm:true,
      isInitialPage:true,
      editForm:true
    });
  }
  addContact(contact:Contact):void{
    this.service.insertContact(this.props.spHttpClient,this.props.siteUrl,contact).then((isContactAdded:boolean)=>{
    if(isContactAdded){
      this.service.getContactsFromList(this.props.spHttpClient,this.props.siteUrl).then(contacts=>{
        this.setState({
          contactList:contacts,
          activeContact:contacts[contacts.length-1],
          showForm:false,
          showContactInfo:true
        })
        alert("Contact Added Successfully");
        this.props.navigate("/details/"+this.state.activeContact.Id);
      })
    }
    else{
      alert("Error in Adding Contact");
    }
    })
  }
  editContact(newContact:Contact):void{
    this.service.updateContact(newContact,this.props.spHttpClient,this.props.siteUrl).then(
      (isContactUpdated:boolean)=>{
        if(isContactUpdated){
          this.service.getContactsFromList(this.props.spHttpClient,this.props.siteUrl).then(contacts=>{
            this.setState({
              contactList:contacts,
              activeContact:contacts[contacts.length-1],
              showForm:false,
              showContactInfo:true
            })
            alert("Contact Updated Successfully");
            this.props.navigate("/details/"+newContact.Id);
          })
        }
        else{
          alert("Error in Updating Contact");
        }
      }
    )
    
  }
  handleFormOperation(contact:Contact){
    (this.state.editForm)
    ?this.editContact(contact)
    :this.addContact(contact);
  }
  render(): React.ReactNode {
    return (
      <div className="mainPage">
        <div>
          <AddressHeader/>
          <NavBar onNavClick={(isAddForm:boolean)=>this.handleForm(isAddForm)}/>
        </div>
        <div className='contacts'>
          <ContactSummary contactList={this.state.contactList}/>
          <Routes>
          <Route path={"/details/:id"} element={ <ContactInfo contactList={this.state.contactList} edit={()=>this.handleEdit()} delete={(id:number)=>this.deleteContact(id)}/>}/>
          <Route path={"/add/:id"} element={<ContactForm contactList={this.state.contactList} action={this.state.editForm} contact={this.state.activeContact} operation={(contact:Contact)=>this.handleFormOperation(contact)}/>}/>
          </Routes>
        </div>    
      </div>
    );
  }
}
export default Main;
