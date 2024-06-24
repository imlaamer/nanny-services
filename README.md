# <div style="display: flex; align-items: center; text-align: center; gap: 10px;" ><img src="./public/baby.svg" width="28"><span>Nannies.Services</span></div>

<p>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-seagreen" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-brightgreen"  /></a>
    <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/Redux-darkgreen"  /></a>
    <a href="https://redux-toolkit.js.org/"><img src="https://img.shields.io/badge/reduxToolkit-white" /></a>
    <a href="https://redux.js.org/usage/writing-logic-thunks"><img src="https://img.shields.io/badge/ReduxThunk-olivegreen"  /></a>
    <a href="https://www.npmjs.com/package/cloudinary"><img src="https://img.shields.io/badge/firebase-forestgreen" /></a>
    <a href="https://axios-http.com/docs/intro"><img src="https://img.shields.io/badge/Axios-huntergreen" /></a>
    <a href="https://www.npmjs.com/package/yup"><img src="https://img.shields.io/badge/Yup-white"  /></a>
    <a href="https://ant.design/"><img src="https://img.shields.io/badge/Antd-seagreen"  /></a>
    <a href="https://www.npmjs.com/package/dayjs"><img src="https://img.shields.io/badge/dayjs-darkgreen" /></a>
    <a href="https://formik.org/docs/overview"><img src="https://img.shields.io/badge/reactHookForm-forestgreen"  /></a>
    <a href="https://www.npmjs.com/package/redux-persist"><img src="https://img.shields.io/badge/reduxPersist-brightgreen" /></a>
    <a href="https://www.npmjs.com/package/react-toastify"><img src="https://img.shields.io/badge/reactToastify-darkgreen"  /></a>
    <a href="https://www.npmjs.com/package/reselect"><img src="https://img.shields.io/badge/reactSelect-green"  /></a>
    <a href="https://www.npmjs.com/package/react-spinners"><img src="https://img.shields.io/badge/reactSpinners-forestgreen" /></a>
   
</p>

## Contents

1. [Overview](#overview)
2. [Pages](#pages)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Layout and Design](#layout-and-design)
6. [Technical Specification](#technical-specification)

## Overview

The <a href="https://nanny-services-app.vercel.app/">Nannies.Services</a>
project is a web application that allows users to browse nanny profiles, manage
favorites, and book appointments. The application utilizes Firebase for user
authentication and realtime database management.

 <img src="./public/screenshots/home-page.png" width=700>

## Pages

The application consists of 3 main pages:

1. **Home Page**: Displays the site title, company slogan, and a link to start
   using the application, which redirects to the "Nannies" page.

2. **Nannies Page**: Lists nannies that users can sort alphabetically (ascending
   A-Z or descending Z-A), filter by price, and sort by popularity (lowest to
   highest rating or vice versa).

3. **Favorites Page**: A private page where authenticated users can view nannies
   they have added to their favorites list.

## Features

- **User Authentication**

  - Registration, login, and logout functionalities using Firebase
    Authentication.
  - Secure access to user-specific data and features.

- **Registration and Login Forms**

  - Implemented with React Hook Form and Yup for minimal field validation.

- **Realtime Database**

  - Firebase Realtime Database used to store nanny profiles.

- **Nannies Page**

  - Displays initial 3 nanny cards.
  - "Load more" button fetches additional nanny profiles from the database upon
    click.

- **Nanny Profile Card**

  - Designed according to the layout with detailed characteristics of each
    nanny.
  - Expandable feature: clicking "Read more" displays additional information and
    reviews from parents.

- **Favorites Management**

  - Non-logged-in users prompted to log in when adding a nanny to favorites.
  - Logged-in users can add nannies to favorites.
  - Favorites persist using localStorage.

- **Favorites Page**

  - Accessible to authenticated users, displaying all nannies added to
    favorites.

- **Appointment Booking**

  - "Make an appointment" button opens a modal window with a form for scheduling
    a meeting with a nanny.
  - Form validation: handled by React Hook Form and Yup.

- **Modal windows**
  - Modal window closes on clicking the close button, backdrop, or pressing the
    Esc key.

## Technologies Used

- **React**
- **React Router**
- **Redux Toolkit & Redux Persist**
- **Firebase**
- **REST**
- **Axios**
- **React Hook Form & Yup**
- **Ant Design**
- **React Select**
- **Framer Motion**
- **React Loader Spinner**
- **React Toastify**
- **React Toastify**

## Layout and Design

The application layout is responsive, ranging from 320px to 1440px width,
ensuring compatibility across mobile, tablet, and desktop devices. Semantic HTML
is used for accessibility and SEO optimization.

<a href="https://www.figma.com/file/u36ajEOsnwio2GDGiabVPD/Nanny-Sevices?type=design&node-id=0-1&mode=design&t=CZpMnnOCRwAYc81O-0">Layout
</a>

## Technical Specification

<a href="https://docs.google.com/document/d/19ugM1gvOw81nCyALr4EZs3dmv6OfJm94VjupcytbnJY/edit">Technical
Specification</a>
