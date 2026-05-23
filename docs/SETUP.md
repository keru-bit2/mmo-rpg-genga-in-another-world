# Setup Guide for MMO-RPG Genga in Another World

## Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** for version control

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mmo-rpg-genga
JWT_SECRET=your_secure_random_string_here
JWT_EXPIRE=7d
```

### 3. Start the Backend

```bash
npm run dev
```

The server will run on `http://localhost:5000`

---

## Web Frontend Setup

### 1. Install Dependencies

```bash
cd web
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Mobile Setup

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Start Metro Bundler

```bash
npm start
```

### 3. Run on Device/Emulator

**For Android:**
```bash
npm run android
```

**For iOS:**
```bash
npm run ios
```

---

## Development

### Running All Services Together

Open 3 terminals and run:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Web
cd web && npm run dev

# Terminal 3 - Mobile
cd mobile && npm start
```

### Database Setup

MongoDB collections are auto-created, but ensure your connection string is correct.

### Testing the Real-time Features

1. Open the web app on two different browsers/tabs
2. Send a message in the chat
3. You should see it appear in real-time on both windows

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running or check Atlas connection string |
| Port already in use | Change port in `.env` or kill the process using that port |
| Module not found | Run `npm install` in the specific directory |
| React Native build fails | Clear cache: `npm start -- --reset-cache` |

---

## Next Steps

1. Implement user authentication endpoints
2. Connect frontend forms to backend APIs
3. Complete WebSocket chat implementation
4. Add database models for guilds and matchmaking
5. Implement real matchmaking algorithm
6. Add UI polish and animations

---

## API Documentation

See `docs/API.md` for complete endpoint documentation.
