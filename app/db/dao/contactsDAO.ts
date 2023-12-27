import database from '../database';
import Contact from '../../models/Contact';
import {writer} from '@nozbe/watermelondb/decorators';

// service
import {addContact} from '../../services/contactsService';

const contacts = database.collections.get('contacts');

export default {
  observeContacts: () => contacts.query().observe(),
  createContact: async (payload: Contact) => addContact(payload),
};
