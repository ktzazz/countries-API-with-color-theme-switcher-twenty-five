# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [API Status](#important-notice-api-migration--status)
- [Overview](#overview)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)

## Important Notice: API Migration & Status

This project was originally built using the `restcountries.com/v3.1` public API.
On June 10, 2026, the API providers deprecated version 3.1 and transitioned to a
paid/restricted premium model (v5), introducing mandatory API Keys and restricting
standard query fields (resulting in HTTP 403 Forbidden errors for free tier users).

To preserve the original, lightweight architecture of this front-end challenge
without requiring users to register for private API keys, the codebase maintains
the standard REST structure.

## Overview

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode
- See error/loading states

### Screenshot

![DESKTOP HOME](/src/assets/results/desktop-home.jpeg)
![DESKTOP DETAILS](/src/assets/results/desktop-details.jpeg)
![TABLET HOME](/src/assets/results/tablet-home.jpeg)
![TABLET DETAILS](/src/assets/results/tablet-details.jpeg)
![MOBILE HOME](/src/assets/results/mobile-home.jpeg)
![MOBILE DETAILS](/src/assets/results/mobile-details.jpeg)

## My process

This was my first time building a completely functional search bar, and it was really easy using the `.filter()` method.
Although the shutdown of the free API version was unfortunate, I learned a lot during the process—such as implementing the search functionality, using the `Link` component for single-page application (SPA) navigation, and toggling the color theme based on both the user's system preferences and a manual click.

### Built with

- **React** - JavaScript library for building user interfaces
- **Vite** - Frontend build tool and development server
- **Sass (SCSS)** - CSS preprocessor for modular styling
- **React Router** - For Single Page Application (SPA) routing and navigation
- **BEM Methodology** - For clean, scalable, and maintainable CSS class naming
- **Autoprefixer & Babel** - For cross-browser compatibility and modern JavaScript support
- **Vercel** - Cloud platform for deployment and hosting
