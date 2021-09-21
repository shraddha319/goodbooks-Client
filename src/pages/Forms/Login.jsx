import './form.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginValidationRules, validate } from '../../validations';
// import { Loader } from '../../components';
import { useAuth, useUser } from '../../contexts';

export default function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    login: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const {
    auth: { status, error },
    loginUser,
    dispatchAuth,
  } = useAuth();
  const { dispatchUser } = useUser();

  useEffect(() => {
    if (status === 'failed' && !error) {
      setFormError({
        email: '',
        password: '',
        login: 'Invalid email/password.',
      });
    } else if (status === 'success') {
      navigate('/books');
    }
  }, [status, navigate]);

  function loginHandler() {
    const validationError = validate(input, loginValidationRules);
    setFormError({ ...formError, ...validationError });

    if (Object.keys(validationError).length === 0) {
      const credentials = (({ email, password }) => ({ email, password }))(
        input
      );
      loginUser(dispatchAuth, dispatchUser, credentials);
    }
  }

  return (
    <div className="form--login layout--center justify-center">
      <div className="form__container">
        <div className="form__header">
          <p className="text text--md text--primary">Login In</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <p className="form__field field__error small">{formError.login}</p>
          <div class="form__field field field--required">
            <label class="field__label" for="email">
              Email
            </label>
            <input
              class="field__input"
              id="email"
              type="email"
              autocomplete="email"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <p className="field__error small">{formError.email}</p>
          </div>
          <div class="form__field field field--required">
            <div className="justify-between">
              <label class="field__label" htmlFor="password">
                Password
              </label>
              <Link to="/" className="text--xs link">
                Forgot password?
              </Link>
            </div>
            <input
              class="field__input"
              id="password"
              type="password"
              autocomplete="current-password"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <p className="field__error small">{formError.password}</p>
          </div>
          <button
            className="btn justify-center btn--primary"
            type="submit"
            onClick={loginHandler}
          >
            {status === 'loading' ? 'loading...' : 'Login'}
          </button>
        </form>
        <div className="form__footer">
          <p>
            New to goodbooks?{' '}
            <Link to="/signup" className="link link--hover">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
