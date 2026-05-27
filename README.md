#NeuroPulse

A full-stack implementation of the classic **Simon memory game** with user authentication, persistent scores, and a leaderboard. Players must remember and repeat an increasingly long sequence of colors. The project includes a responsive UI and a backend that stores user accounts and scores.

---

## Live Demo

Add your deployed link here:

`https://simon-game-b7be.onrender.com`

---

## Features

* User authentication (Signup / Login)
* Password reset functionality
* Simon memory game logic
* Persistent score saving
* Global leaderboard
* Responsive UI for desktop and mobile
* Full-stack deployment

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* jQuery

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Deployment

* Render

---

## Project Structure

```
simon-game/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── score.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── score.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── score.routes.js
│   │   │
│   │   ├── utils/
│   │   │   └── hash.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── public/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── game.js
│   │   ├── leaderboard.js
│   │   └── reset.js
│   │
│   ├── sounds/
│   │
│   ├── login.html
│   ├── game.html
│   ├── leaderboard.html
│   └── forgot-password.html
│
└── README.md
```

---

## Game Rules

1. Press **Start Game**.
2. The game shows a sequence of colors.
3. Repeat the sequence by clicking the buttons.
4. Each level adds a new color.
5. If you make a mistake, the game ends and your score is saved.

---

## Running Locally

### 1. Clone the repository

```
git clone https://github.com/omkar-islavath/simon-game-fullstack.git
cd simon-game-fullstack
```

### 2. Install backend dependencies

```
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in `backend/`:

```
DATABASE_URL=your_database_connection_string
PORT=3000
```

### 4. Start the server

```
npm run dev
```

### 5. Open in browser

```
http://localhost:3000
```

---

## Future Improvements

* Email-based password reset
* JWT authentication
* Animated game board
* Sound toggle
* Multiplayer mode

---
## Screenshots

### Login Page
![Login Page](assets/login.png)

### Game Page
![Game Page](assets/game.png)

### Leaderboard
![Leaderboard](assets/leaderboard.png)

### Reset Password
![Reset Password](assets/resetpassword.png)

## Author

Omkar Islavath

GitHub:
https://github.com/omkar-islavath
