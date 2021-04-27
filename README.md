# PG6301 Exam

A messaging application written in React with Express for my exam in 
Web Development and API Design (PG6301).

## Instructions of the assignment
* [x] A logged-in user should be able to register more users in the system
    * [x] Users should have properties first name, last name and email address
    * [ ] Optionally, users can have description and picture
* [x] A logged-in user should be able to create messages that are sent to one or more users
* [x] Users should be able to see messages where they are a recipient or sender
* [ ] Users should be able to respond to messages

## Start application
First thing you need to do is to download all node modules (npm install) and then start the server (npm start).
The server will then be running on http://localhost:3000.
```
npm install
npm start
```

In order to use the application you need to log in. Use any of the provided login credentials. 
After you have logged in, you can create new users.
```
Username: per@mail.com
Password: 123

Username: sander@mail.com
Password: 123
```

When you're logged in you can navigate to the different pages on the navigation bar.

* **Login**: Log in with provided credentials or with a created user.
 
* **Profile**: See user information, create new users, and see all users.

* **Send Message**: Send messages to a specific user registered

* **Message Log**: Show all messages that the user have sent or received

## Design Choices
* **Navigation**: I wanted to always keep the navigation bar on the top of all pages for ease of use.

* **Pages**: Every page have one feature that is specific to that page (Send Message, Login etc...).
This make it easy to find the specific task you want to do.

* **Login**: How I interpreted the text was that the chat should be "unique" and users can create new users. Therefore,
I decided that in order to use any of pages you need to be logged in. (With one bug, listed at the end.)

## Shared code
The following code in MessageLogPage.jsx I have **shared** to candidate nr. 8104
```js
  const findSentMessages = user.filter((e) => e.username === username);
  const findReceivedMessages = user.filter((e) => e.receiver === username);
```

The following code in authApi.js I have **received** from candidate nr. 8104
```js
  let foundUser = false;
  let user;
  users.forEach((e) => {
    if (e.email == username && e.password == password) {
      foundUser = true;
      user = e;
    }
  });

  if (foundUser) {
    req.session.username = username;
    res.end();
  } else {
    res.sendStatus(401);
  }
```

## Bugs
- If you're not logged in and navigating to "Send Messages", it doesn't render. 

## Extra
* [x] Format with Prettier