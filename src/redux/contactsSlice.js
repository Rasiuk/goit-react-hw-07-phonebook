import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const contactsSlice = createSlice({
  name: 'contactsState',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected](state, acton) {
      state.error = acton.payload;
      state.isLoading = false;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts.push(action.payload);
    },
    [addContact.rejected](state, acton) {
      state.error = acton.payload;
      state.isLoading = false;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
      state.isLoading = false;
    },
    [deleteContact.rejected](state, acton) {
      state.error = acton.payload;
      state.isLoading = false;
    },
  },
  //   reducers: {
  //     addContact(state, action) {
  //       const existingContact = state.contacts.find(
  //         contact => contact.name === action.payload.name
  //       );
  //       if (existingContact) {
  //         alert(`${action.payload.name} is already in contacts`);
  //         return;
  //       }
  //       state.contacts.push(action.payload);
  //     },
  //     deleteContact(state, action) {
  //       const index = state.contacts.findIndex(
  //         contact => contact.contactId === action.payload
  //       );
  //       state.contacts.splice(index, 1);
  //     },
  //   },
});

export const contactReducer = contactsSlice.reducer;
// export const { addContact, deleteContact } = contactsSlice.actions;
// Selectors
export const getContacts = state => state.contacts.contacts;
export const getLoadin = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
