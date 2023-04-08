import { Formik, ErrorMessage } from 'formik';
import { useState } from 'react';
import { Form, Field, Label, Section, Button } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/contactsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(getContacts);
  const handleChange = evt => {
    const inputName = evt.target.name;

    switch (inputName) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'phone':
        setPhone(evt.target.value);
        break;
      default:
        return '';
    }
  };
  const onSubmit = evt => {
    const newContact = { name, phone };

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      return toast(`${name} is already in contacts`);
    }

    dispatch(addContact(newContact));
    reset();
  };
  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Section>
      <Formik initialValues={(name, phone)} onSubmit={onSubmit}>
        <Form>
          <Label>
            Name
            <Field
              onChange={handleChange}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage name="name" />
          </Label>

          <Label>
            Number
            <Field
              onChange={handleChange}
              value={phone}
              type="tel"
              name="phone"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMessage name="phone" />
          </Label>
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </Section>
  );
};
