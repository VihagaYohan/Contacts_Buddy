import {Model} from '@nozbe/watermelondb';
import {field, text} from '@nozbe/watermelondb/decorators';

export default class Contact extends Model {
  static table = 'contacts';

  @text('first_name') firstName;
  @text('last_name') lastName;
  @text('company') company;
  @text('phone') phone;
  @text('email') email;
  @text('address') address;
}
