
AUTOMATION OF SAUCEDEMO ESHOP
-----------------------------


Table of Contents

- About The Project
- Built With
- Prerequisites
- Installation
- Contact
    


ABOUT THE PROJECT
-----------------
The goal of this project is to create simple automated tests for eshop https://www.saucedemo.com/ with use of POM concept. Automated tests in this project go through basic flow such as user login, adding products in shopping cart, fill in user information form and finishing the order. Tests are designed to test only front-end.

This project also includes basic API tests for https://bankground.apimate.eu/ such as creating a user, login with token, get detail of created user and update data of the user. Tests dont use SOM yet.

In this project POM concept represents each page of saucedemo eshop as a single class(file) with its own properties and methods. Methods of these classes are afterwards used in test files to interact with particular page of saucedemo eshop. Files with classes are stored in "src" - "pom" folder

Test data are stored in external files in "data" folder.
Definition of data types for test data are stored in external files in "src" - "type" folder
Selectors for pages are stored in external files and every page has its own file with selectors stored in "data" - "selector" folder



BUILD WITH
----------
- Node.js
- Javascript
- Typescript
- Playwright framework


PREREQUISITES 
-------------

* Node.js
* npm
* IDE


INSTALLATION
------------

1. Clone the repo - in terminal run command:

   git clone https://github.com/kvesel8/ukol_odevzdani_02_2025.git

2. Open cloned repo in you IDE

3. Install NPM packages - open a new terminal and run command:
   
   npm install

4. Install web browers for playwright - in terminal run command:

    npx playwright install

5. Change git remote url to avoid accidental pushes to base project
   
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes


HOW TO RUN TEST
---------------
1. Open a new terminal in your IDE

2. For headless run of tests run command:

   npx playwright test

3. For ui run of tests run command:

   npx playwright test --headed

4. To run specific test run command:

   npx playwright test yourTest.spec.ts



CONTACT
-------

Klara Vesela - k.vesel8@seznam.cz

Project Link: https://github.com/kvesel8/ukol_odevzdani_02_2025