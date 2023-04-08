import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { contactReducer } from './contactsSlice';
// import { persistedReducer } from './contactsSlice';

export const store = configureStore({
  reducer: { contacts: contactReducer, filter: filterReducer },
});
