# Architecture Overview

## System Design

MMO-RPG Genga in Another World is built on a **3-tier architecture** with real-time capabilities.

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
├──────────────────────┬──────────────────────┬─────────────┤
│  Web (React/Vite)   │  Mobile (RN)         │ Admin Panel  │
└──────────────────────┴──────────────────────┴─────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   API & WebSocket Layer                  │
│  Express.js + Socket.io (Real-time Communication)       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Business Logic Layer                  │
│  Services (Auth, Users, Chat, Guilds, Matchmaking)      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Data Access Layer                      │
│  MongoDB (NoSQL Database)                               │
└─────────────────────────────────────────────────────────┘
```

---

## Data Models

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  level: Number,
  experience: Number,
  rank: String,
  avatar: String,
  friends: Array<FriendRef>,
  guildId: ObjectId,
  stats: {
    wins: Number,
    losses: Number,
    kills: Number,
    deaths: Number
  },
  isOnline: Boolean,
  createdAt: Date
}
```

### Guild Schema
```javascript
{
  name: String,
  description: String,
  leader: ObjectId,
  members: Array<{
    userId: ObjectId,
    role: String (leader|officer|member)
  }>,
  level: Number,
  logo: String,
  treasury: {
    gold: Number,
    resources: Number
  },
  createdAt: Date
}
```

### Chat Schema
```javascript
{
  participants: Array<ObjectId>,
  isGroupChat: Boolean,
  groupName: String,
  messages: Array<{
    sender: ObjectId,
    content: String,
    timestamp: Date
  }>,
  createdAt: Date
}
```

---

## Communication Flow

### Authentication Flow
```
1. User enters credentials
2. Frontend sends POST /auth/login
3. Backend verifies password
4. Backend generates JWT token
5. Token stored in client storage
6. Token sent with each API request (Authorization header)
```

### Real-time Chat Flow
```
1. User opens chat window
2. WebSocket connection established
3. User joins chat room: socket.emit('join-chat')
4. User sends message: socket.emit('send-message')
5. Server broadcasts to room: io.to(roomId).emit('new-message')
6. All participants receive message in real-time
```

### Matchmaking Flow
```
1. User clicks "Queue Now"
2. POST /matchmaking/queue with gameMode
3. Server adds to queue
4. Background job matches similar ranks
5. Socket event 'match-found' sent to clients
6. Game session created
7. Players redirected to game lobby
```

---

## Scalability Considerations

### Current (Single Server)
- SQLite or single MongoDB instance
- Real-time updates via Socket.io

### Future (Scaled)
- Load balancer (Nginx)
- Multiple API servers
- Redis for session/cache
- MongoDB replica set
- Dedicated WebSocket servers
- Microservices (Auth, Chat, Matchmaking)
- Message queue (RabbitMQ)

---

## Security

- **Authentication:** JWT tokens with expiration
- **Password:** bcrypt hashing (10 salt rounds)
- **HTTPS:** Required in production
- **CORS:** Configured for allowed origins
- **Input Validation:** Joi schema validation
- **Rate Limiting:** Prevent abuse

---

## Performance Optimization

- Database indexing on frequently queried fields
- Pagination for large datasets
- Caching user profiles and leaderboards
- CDN for static assets
- Socket.io room optimization
- Database connection pooling

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend Runtime** | Node.js |
| **Web Framework** | Express.js |
| **Real-time** | Socket.io |
| **Database** | MongoDB |
| **Authentication** | JWT |
| **Frontend (Web)** | React + Vite |
| **Frontend (Mobile)** | React Native |
| **State Management** | Redux Toolkit |
| **Styling (Web)** | TailwindCSS |
| **API Client** | Axios |

---

## Deployment

### Backend
- Docker container
- Environment variables for secrets
- MongoDB Atlas for database
- Hosted on: Heroku, Railway, or DigitalOcean

### Web Frontend
- Build: `npm run build`
- Static hosting: Vercel, Netlify, or GitHub Pages
- CDN for asset delivery

### Mobile
- App Store: React Native build
- Google Play: React Native build
- Over-the-air updates: CodePush

---

## Development Workflow

1. Create feature branch
2. Implement in backend and frontend simultaneously
3. Test API with Postman
4. Test WebSocket with multiple clients
5. Create Pull Request
6. Code review and merge
7. Deploy to staging
8. Test integration
9. Deploy to production
