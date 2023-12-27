import {Model} from '@nozbe/watermelondb';
import {field, text, writer} from '@nozbe/watermelondb/decorators';
import {COLLECTIONS} from '../constants';

export default class Contact extends Model {
  static table = 'contacts';

  @text('first_name') firstName;
  @text('last_name') lastName;
  @text('company') company;
  @text('phone') phone;
  @text('email') email;
  @text('address') address;
}
