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

### 🧪 Install and Run Everything

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hangman-v2.git
cd hangman-v2

# 2. Install frontend dependencies
npm install

# 3. Start Docker Desktop (make sure it’s running before continuing)

# 4. Start MongoDB using Docker
docker-compose up -d

# 5. Start the backend server
cd backend
npm install
node server.js
# Keep this terminal open

# 6. In a new terminal, return to project root and start React
cd ..
npm start
npm start
