import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import defaultContacts from '../data/defaultContacts';

export class App extends Component {
  state = {
    contacts: defaultContacts,
    filter: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();
  searchInputId = nanoid();

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const contactId = nanoid();
    if (
      this.state.contacts.some(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      this.addContact(contactId, name, number);
    }
    form.reset();
  };

  addContact = (contactId, name, number) => {
    const contact = {
      id: contactId,
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '50px',
          color: 'biege',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          nameInputId={this.nameInputId}
          numberInputId={this.numberInputId}
        />

        <h2>Contacts</h2>

        <Filter
          id={this.searchInputId}
          value={this.state.value}
          onChange={this.handleFilterChange}
        />

        <ContactList
          contactList={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
