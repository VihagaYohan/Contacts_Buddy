import database from '../database';
import Contact from '../../models/Contact';

// service
import {addContact} from '../../services/contactsService';

const contacts = database.collections.get('contacts');

export default {
  observeContacts: () => contacts.query().observe(),
  createContact: async (payload: Contact) => addContact(payload),
};
