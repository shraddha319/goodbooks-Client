import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  UserProvider,
  ToastProvider,
  BooksProvider,
  AuthProvider,
} from './contexts';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <BooksProvider>
          <UserProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UserProvider>
        </BooksProvider>
      </ToastProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
