import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="Login">
      <div className="login__form">
        <div className="login__header">
          <p className="text text--md text--primary">Sign In</p>
        </div>
        <form>
          <div class="form__field field">
            <label class="field__label" for="email">
              Email
            </label>
            <input
              class="field__input"
              id="email"
              type="email"
              autocomplete="email"
            />
          </div>
          <div class="form__field field">
            <label class="field__label" for="password">
              Password
            </label>
            <input
              class="field__input"
              id="password"
              type="password"
              autocomplete="current-password"
            />
          </div>
          <div className="justify-between">
            <button className="btn btn--icon--right btn--primary">
              <p class="btn__text">Login</p>
              <span class="btn__icon fa--xs">
                <i class="fas fa-sign-in-alt"></i>
              </span>
            </button>
            <button className="login__password-reset btn btn--link">
              Forgot password?
            </button>
          </div>
        </form>
        <Link className="btn btn--link" to="/sign-up">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}
