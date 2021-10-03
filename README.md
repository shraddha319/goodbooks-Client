<img src="src/assets/logo.svg" height="150px" align="right"/>

# goodbooks

[![Build Status](https://api.netlify.com/api/v1/badges/1fc3d97c-aea0-4f4e-ba6f-91b0a81aa8bc/deploy-status)](https://app.netlify.com/sites/goodbooks-buy/deploys) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

_An e-commerce application built exclusively for books using MERN stack._

## Installation and Setup Instructions

Clone this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

```bash
npm install
```

To Start Server

```bash
npm start
```

Visit app on your browser at:

`localhost:3000`

## Tech Stack

- **UI Library**: React JS
- **CSS library**: [Krypton UI](https://krypton-ui.netlify.app)
- **Routing**: react router v6

API source code can be found [here](https://github.com/shraddha319/goodbooks-api)

## Features

### State manaement

- User, Cart, Wishlist, Auth: React useReducer + useContext

### Authentication

- User Sign Up
- User Login
- Persist logged-in state with localStorage
- Edit user profile

### Cart Management

- Add items to cart
- Remove items from cart
- Update quantity on individual items

### Wishlist Management

- Add items to wishlist
- Remove items from wishlist
- Move items to cart

### Others

- Filter books by genre, language, availability, rating etc.
- Sort books by price and rating
- Toast message on every update to cart and wishlist
- Protected Routes
- Redirect to login for unauthenticated users
- Custom form validation
- Authentication with JWT
- Persist previous login session with localStorage
- 404 page for incorrect route handling

## Routes

- `/` - home
- `/books` - books listing
- `/books/:bookId` - book details
- `/login` - login
- `/signup` - register

Follwing routes require user authentication:

- `/cart` - user cart
- `/wishlist` - user wishlist
- `/profile` - edit user profile, logout

## Attribution

- Logo: books by ProSymbols from the [Noun Project](https://thenounproject.com)
- Icons: [React icons](https://react-icons.github.io/react-icons/), [Font Awesome](https://fontawesome.com)
