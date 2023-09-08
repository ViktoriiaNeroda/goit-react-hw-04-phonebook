import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from './Form/Form';
import { ContactsList } from './Contacts/Contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('changed-contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(initialContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('changed-contacts', JSON.stringify(contacts));
  }, [contacts]);
    
  const onSubmit = (values) => {
    const contactExists = contacts.some(contact => contact.name === values.name);

    if (contactExists) {
      alert(`Contact "${values.name}" already exists in the list.`);
    } else {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.number,
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  
  const onDelete = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

    return (
      <div>
        <ContactForm onSubmit={onSubmit} />
        <ContactsList contacts={contacts} onDeleteContact={onDelete} />
      </div>
    );
  }
