# PG6301 Exam

## Intro
A messaging application written in React with Express.

## Instructions of the assignment
* [x] A logged-in user should be able to register more users in the system
    * [x] Users should have properties first name, last name and email address
    * [ ] Optionally, users can have description and picture
* [x] A logged-in user should be able to create messages that are sent to one or more users
* [x] Users should be able to see messages where they are a recipient or sender
* [ ] Users should be able to respond to messages

## Starting the application
```
1. npm install
2. npm start
```

## Login credentials
```
Username: per@mail.com
Password: 123

Username: sander@mail.com
Password: 123
```

## Design Choices

## Shortcomings

## Bugs

## Shared code
The following code in authApi.js I have shared to candidate X
```js
  const findSentMessages = user.filter((e) => e.username === username);
  const findReceivedMessages = user.filter((e) => e.receiver === username);
```

The following code in authApi.js I have received from candidate X
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


## Extra
* [x] Format with Prettier