import database from '../db/database';
import {} from '@nozbe/watermelondb';

// constants
import {COLLECTIONS} from '../constants';

// model
import Contact from '../models/Contact';
import Response from '../models/Response';

// get all contacts
export const getAllContact = async () => {
  try {
    return database.get(COLLECTIONS.contacts);
  } catch (e) {
    return new Response(false, 'Unable to fetch contacts');
  }
};

// create contacts
export const addContact = async (payload: Contact) => {
  try {
    let result = await database
      .get(COLLECTIONS.contacts)
      .create((contact: any) => {
        contact.firstName = payload.firstName;
        contact.lastName = payload.lastName;
        contact.company = payload.company;
        contact.email = payload.email;
        contact.phone = payload.phone;
        contact.address = payload.address;
      });
    console.log(result);
    return new Response(true);
  } catch (e) {
    console.log(e);
    return new Response(false, 'Unable to create contact');
  }
};

// delete contacts
export const deleteContact = async (id: string) => {
  try {
    database.write(async () => {
      (await database.get(COLLECTIONS.contacts).find(id)).destroyPermanently();
    });
    return new Response(true);
  } catch (e) {
    return new Response(false, 'Unable to delete contact');
  }
};
