import { loginRequest, signUpRequest, API } from '../../api';

export const loginUser = async (dispatchAuth, dispatchUser, credentials) => {
  try {
    dispatchAuth({ type: 'LOGIN_REQUEST' });
    const {
      data: {
        data: { user, authToken },
      },
      status,
    } = await loginRequest(credentials);
    if (status === 200) {
      API.defaults.headers.common['Authorization'] = authToken;
      dispatchUser({ type: 'SET_USER', payload: { user } });
      dispatchAuth({ type: 'LOGIN_SUCCESS', payload: { authToken } });
      localStorage.setItem('authToken', authToken);
    }
  } catch (error) {
    if (error?.response) {
      dispatchAuth({
        type: 'LOGIN_FAILED',
      });
    } else console.log(error);
  }
};

export const signUpUser = async (dispatchAuth, dispatchUser, input) => {
  try {
    dispatchAuth({ type: 'SIGNUP_REQUEST' });
    const { status } = await signUpRequest(input);
    if (status === 201) {
      const loginCred = (({ email, password }) => ({ email, password }))(input);
      loginUser(dispatchAuth, dispatchUser, loginCred);
    }
  } catch (error) {
    if (error?.response) {
      dispatchAuth({
        type: 'SIGNUP_FAILED',
        payload: { error: error.response.data.error },
      });
    } else console.log(error);
  }
};
