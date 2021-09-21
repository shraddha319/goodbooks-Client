import './Home.css';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div className="Home">
      <section className="hero">
        <div className="hero__container flex--row">
          <div className="hero__content">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Classics')
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString('Fiction')
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString('Biographies')
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString('Comics')
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString('Self-Help')
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString('Exam Prep')
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
              options={{
                loop: true,
              }}
            />
            <p className="text text--md">
              Buy Amazing Books at Amazing Prices!
            </p>
            <Link
              className="btn btn--md btn--icon--right btn--primary"
              to="signup"
            >
              <p class="btn__text">Sign Up</p>
              <span class="btn__icon fa--xs">
                <i class="fas fa-user-plus"></i>
              </span>
            </Link>
            <div className="hero__login flex-column">
              <p className="text--sm">Already a member?</p>
              <Link
                className="btn btn--md btn--icon--right btn--primary"
                to="/login"
              >
                <p class="btn__text">Login</p>
                <span class="btn__icon fa--xs">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
