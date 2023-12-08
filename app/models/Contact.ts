export default class Contact {
  firstName: String;
  lastName: String;
  company: String;
  phone: String;
  email: String;
  address: String;

  constructor(
    firstName: String,
    lastName: String,
    company: String,
    phone: String,
    email: String,
    address: String,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}
