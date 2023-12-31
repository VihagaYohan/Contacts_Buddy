type RootStackParamList = {
  home_screen: undefined;
  details_screen: {
    contact: {
      id: string;
      firstName: string;
      lastName: string;
      company: string;
      phone: string;
      email: string;
      address: string;
    };
  };
  new_contact_screen: undefined;
};

export default RootStackParamList;
