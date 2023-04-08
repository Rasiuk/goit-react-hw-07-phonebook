// import { useState, useEffect } from 'react';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './Form/Form';
import { Section } from './Default.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getLoadin } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { Toast } from './Toastyfy/ToastContainer';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadin);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Section>
      <Toast />
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      {isLoading && !error && <b>Request in progress...</b>}
      {!isLoading && <Filter />}
      {!isLoading && <ContactList />}
    </Section>
  );
};
