export interface signIn {
  username: string;
  password: string;
  setCookie: boolean;
}

export interface SignInResponse {
  succeeded: boolean;
  hasViewPermission: any;
  data: data;
  errors: [];
  messages: [];
}

interface data {
  authToken: string;
  refreshToken: string;
  validateTill: string;
}

export interface signInErrors {
  signIn: string;
}
