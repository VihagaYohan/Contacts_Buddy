import database from '../db/database';

// constants
import {COLLECTIONS} from '../constants';

// model
import Contact from '../models/Contact';
import Response from '../models/Response';

// create contacts
export const addContact = async (payload: Contact) => {
  try {
    await database.get(COLLECTIONS.contacts).create(contact => payload);
    return new Response(true);
  } catch (e) {
    return new Response(false, 'Unable to create contact');
  }
};
