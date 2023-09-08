import { useEffect, useState } from "react"
import { ContactsList } from "./ContactsList/ContactsList";
import { AddContactForm } from "./AddContactForm/AddContactForm";
import { ContactsFilter } from "./ContactsFilter/ContactsFilter";
import { Section } from "./Section.styled";

const KEY = "CONTACTS_ARR";

export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [haveContacts, setHaveContacts] = useState(false);

  const localContacts = localStorage.getItem(KEY)

  const addContact = (newContact) => {
    if(contacts.find(contact => contact.name === newContact.name)){
      alert(`${newContact.name} is already in your phonebook`);
      return;
    }

    setContacts(prevState => [...prevState, newContact])
  }

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId))
  }
  
  const nameFilter = (contactName) => {
    setFilter(contactName)
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase))
  }
  
  // get contacts from Local Storage
  useEffect(() => {
    setContacts(() => {
      if(localContacts !== null){
        setContacts(JSON.parse(localContacts))
      }
    })
    if(contacts.length === 0){
      setHaveContacts(false);
    } else{
      setHaveContacts(true);
    }
  }, [localContacts, contacts])

  // put contacts to local storage
  
  useEffect((prevState)=> {
    if(prevState !== contacts){
      localStorage.setItem(KEY, JSON.stringify(contacts))
    }
  }, [contacts])




  return(
    <>
      <Section>
        <AddContactForm addContact = {addContact}/>
      </Section>
      <Section>
        <h2>Contacts:</h2>
        {haveContacts === true 
        ?(
        <>
            <ContactsFilter filter = {filter} onNameFilter = {nameFilter}/>
            <ContactsList contacts = {contacts} onDelete = {deleteContact}/>
          </>
          ):(
            <>
              <p>You don't have any contacts. Create a new one!</p>
            </>
          )};
      </Section>
    </>)}