export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserProfile {
  name: string;
  address: string;
  user_credential_id: string;
}

export interface IService {
  name: string;
  price: number;
}
