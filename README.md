# Bookworms Book Club App

## Overview

Bookworms is a centralized hub for book enthusiasts, streamlining the book club experience.

### Features

- Users sign up
- Login
- Create or join book clubs
- Home page lists all book clubs that the user belongs to
- BookClubPage lists the specific book club details, club members, and meeting details
- Set meeting information (book, date, location/online streaming service)

# Installation

For installation use the terminal to install node modules with the command:

> npm i

### Tech Stack

- React
- TypeScript
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express
  - bcrypt
  - swagger

### APIs

- No external APIs will be used for this sprint
  - Some nice-to-haves would require a book API (Google Books API, Internet Archive API, Open Library API)
- Created my own server. The following are a list of the endpoints created:

##### Endpoint: /users/

###### Method: POST

###### Description: This endpoint is used for creating new user accounts. It requires username, name, and password in the request body.

###### Body Params:

- username (string, example: "wizardFan123")
- name (string, example: "Hermione Granger")
- password (string, example: "Alohomora123!")

##### Endpoint: /users/{userID}

###### Method: GET

###### Description: Retrieves information about a specific user, identified by userID.

###### Body Params: None

###### Path Params:

- userID (string, example: "3f14b0a3-a5e9-4ed5-8fac-9f1e5c7e3e74")

###### Method: PUT

###### Description: Updates information for a specific user, identified by userID. Allows updating username and name.

###### Body Params:

- username (string, example: "HogwartsChampion")
- name (string, example: "Harry Potter")

###### Path Params:

- userID (string, example: "3f14b0a3-a5e9-4ed5-8fac-9f1e5c7e3e74")

##### Endpoint: /users/login

###### Method: POST

###### Description: This endpoint is used for user authentication, requiring username and password.

###### Body Params:

- username (string, example: "SiriusBlack")
- password (string, example: "Padfoot4ever")

##### Endpoint: /clubs/

###### Method: POST

###### Description: This endpoint allows the creation of new clubs, requiring details like clubName and description.

###### Body Params:

- clubName (string, example: "Dumbledore's Army")
- description (string, example: "A group for learning and practicing Defense Against the Dark Arts.")

##### Endpoint: /clubs/join/{clubID}

###### Method: POST

###### Description: Allows users to join a specific club, identified by clubID. Requires userID and role in the request body.

###### Body Params:

- userID (string, example: "1a1519a9-529a-47bc-832e-dfb5f43d8f23")
- role (string, example: "Member")

###### Path Params:

- clubID (string, example: "f07b87c9-24d1-42e8-9c6d-5d6e3c626f3b")

##### Endpoint: /clubs/{clubID}

###### Method: GET

###### Description: Retrieves information about a specific club, identified by clubID.

###### Body Params: None

###### Path Params:

- clubID (string, example: "d1e4f8e1-cbeb-4b4a-a5d6-8f9b3d8daabb")

###### Method: PUT

###### Description: Updates information for a specific club, identified by clubID. Allows updating clubName and description.

###### Body Params:

- clubName (string, example: "The Slug Club")
- description (string, example: "A club for students of high ambition and connections.")

###### Path Params:

- clubID (string, example: "d1e4f8e1-cbeb-4b4a-a5d6-8f9b3d8daabb")

##### Endpoint: /clubs/{clubID}/users

###### Method: GET

###### Description: Lists all users associated with a specific club, identified by clubID.

###### Body Params: None

###### Path Params:

- clubID (string, example: "5ec1fd84-aa8a-4adb-9dfe-ea0c3a0b0f5f")

##### Endpoint: /clubs/{clubID}/meetings

###### Method: GET

###### Description: Lists all meetings associated with a specific club, identified by clubID.

###### Body Params: None

###### Path Params:

- clubID (string, example: "5ec1fd84-aa8a-4adb-9dfe-ea0c3a0b0f5f")

##### Endpoint: /clubs/edit-role/{userID}/{clubID}

###### Method: PUT

###### Description: Updates the role of a specific user in a club, identified by both userID and clubID. Requires the new role in the request body.

###### Body Params:

- role (string, example: "Club President")

###### Path Params:

- userID (string, example: "2c12fc19-e89b-4be6-af34-e732a5f3c8a5")
- clubID (string, example: "b1a0c7e1-0964-4a98-9b19-f9f49a601f28")

##### Endpoint: /clubs/user/{userID}

###### Method: GET

###### Description: Retrieves information

about clubs associated with a specific user, identified by userID.

###### Body Params: None

###### Path Params:

- userID (string, example: "c4d2f1db-0674-4e39-9dc4-8d8e4e8b756d")

##### Endpoint: /meetings/

###### Method: POST

###### Description: Creates a new meeting for a club, requiring details like clubID, date, location, and book.

###### Body Params:

- clubID (string, example: "6fa917b2-3b58-4b70-9f3a-c290bdc3cbbf")
- date (string, example: "2024-05-20")
- location (string, example: "Hogwarts Library")
- book (string, example: "Fantastic Beasts and Where to Find Them")

##### Endpoint: /meetings/{meetingID}

###### Method: PUT

###### Description: Updates information about a specific meeting, identified by meetingID. Allows updating date, location, and book.

###### Body Params:

- date (string, example: "2024-06-10")
- location (string, example: "The Three Broomsticks")
- book (string, example: "The Tales of Beedle the Bard")

###### Path Params:

- meetingID (string, example: "9c3ff4ce-ffd5-4b3c-8be6-d7a0f3e1f70e")

### Sitemap

- Login page
  - Requires user to either login into an existing account or create a new account
  - Non-members cannot access further information
  - Successful submission redirects user to home page
- Sign up page
  - Successful submission redirects user to home page
- Home page
  - Displays all the book clubs a user belongs to
- Book club page
  - Displays all information specific to the book club (club name, description, members)
- Create a book club page
- Create a meeting page

## Nice-to-haves

- Book ratings
- Page on each user's profile that catalogs what books they've read (in or outside of book clubs) and their ratings
- Invite friends via email/text/QR code
- Individual's checklist
  - eg. buy book, chapter checkpoints
- Chapter notes
  - eg. quotes, themes, etc.
- Achievement badges
- Next book recommendations (would require book api)
- Members can create a book suggestion that they want their group to read next
- Voting system for selecting next book
- An interactive calendar for meeting dates
- Group message board
- Linking to bookstores/libraries that have the book (api)
- Forgot password functionality
