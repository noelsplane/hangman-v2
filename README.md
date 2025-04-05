# 🎯 Hangman v2.0

A full-stack Hangman game built with **React**, **Express**, and **MongoDB** — featuring persistent player stats and a real-time leaderboard.

![screenshot](./public/noose.png)

---

## ✨ Features

- 🔡 Single-letter guessing game with hangman art
- ✍️ Player name input before starting
- 📈 Tracks win percentage by player
- 🏆 Real-time leaderboard (sorted by win rate)
- 🐳 MongoDB powered via Docker Compose
- 🧪 Unit tested with Jest + React Testing Library

---

## 🧩 Tech Stack

| Layer        | Tech                 |
|--------------|----------------------|
| Frontend     | React.js             |
| Backend      | Express.js (Node.js) |
| Database     | MongoDB              |
| Container    | Docker Compose       |
| Testing      | Jest + RTL           |

---

## How to run it locally: 

Follow these steps to get the app running on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hangman-v2.git
cd hangman-v2

# 2. Install frontend dependencies
npm install

# 3. Start MongoDB using Docker
docker-compose up -d

# 4. Start the backend API server
cd backend
npm install
node server.js

# 5. In a separate terminal, return to root and start React app
cd ..
npm start
