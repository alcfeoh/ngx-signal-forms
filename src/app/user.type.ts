export interface UserInfo {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    zip: string;
    city: string;
  };
  cc: string;
}
