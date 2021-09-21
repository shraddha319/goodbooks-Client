import API from './config';

/**
 *
 * @param {email: String, password: String, authToken: JWT} credentials
 */
export function loginRequest(credentials) {
  if (credentials.email && credentials.password)
    return API.post('/auth/login', credentials);
  else
    return API.post(
      '/auth/login',
      {},
      {
        headers: { Authorization: credentials.authToken },
      }
    );
}

/**
 *
 * @param {Object: {
 * email: String,
 * password: String,
 * firstName: String,
 * lastName: String
 * }} user
 */
export function signUpRequest(user) {
  return API.post('/users', user);
}
