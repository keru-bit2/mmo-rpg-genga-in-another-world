# API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## Authentication Endpoints

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "username": "dragonslayer",
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "dragonslayer",
    "level": 1,
    "rank": "Bronze"
  }
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}
```

---

## User Endpoints

### Get User Profile

```http
GET /users/:userId
Authorization: Bearer {token}
```

### Update User Profile

```http
PUT /users/:userId
Authorization: Bearer {token}
Content-Type: application/json

{
  "bio": "Legendary warrior",
  "avatar": "avatar_url"
}
```

### Get Leaderboard

```http
GET /users/leaderboard?limit=100&page=1
```

---

## Friends Endpoints

### Get Friends List

```http
GET /friends
Authorization: Bearer {token}
```

### Send Friend Request

```http
POST /friends/request
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetUserId": "user_id_to_add"
}
```

### Accept Friend Request

```http
POST /friends/accept
Authorization: Bearer {token}
Content-Type: application/json

{
  "requestId": "request_id"
}
```

### Remove Friend

```http
DELETE /friends/:friendId
Authorization: Bearer {token}
```

---

## Guild Endpoints

### Create Guild

```http
POST /guilds
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Dragon Slayers",
  "description": "Elite raid team"
}
```

### Get Guild Info

```http
GET /guilds/:guildId
```

### Add Member to Guild

```http
POST /guilds/:guildId/members
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user_id"
}
```

### Remove Member

```http
DELETE /guilds/:guildId/members/:userId
Authorization: Bearer {token}
```

---

## Chat Endpoints

### Get Conversations

```http
GET /chat/conversations
Authorization: Bearer {token}
```

### Get Messages

```http
GET /chat/conversations/:conversationId/messages
Authorization: Bearer {token}
```

### Send Message

```http
POST /chat/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "conversationId": "conv_id",
  "content": "Hello team!"
}
```

---

## Matchmaking Endpoints

### Join Queue

```http
POST /matchmaking/queue
Authorization: Bearer {token}
Content-Type: application/json

{
  "gameMode": "1v1",
  "rank": "Platinum"
}
```

### Get Queue Status

```http
GET /matchmaking/status
Authorization: Bearer {token}
```

### Leave Queue

```http
DELETE /matchmaking/queue
Authorization: Bearer {token}
```

---

## WebSocket Events

### Chat Events

**Connect:**
```javascript
socket.emit('join-chat', { chatId: 'chat_123', userId: 'user_123' });
```

**Send Message:**
```javascript
socket.emit('send-message', {
  chatId: 'chat_123',
  userId: 'user_123',
  content: 'Hello!',
  timestamp: Date.now()
});
```

**Listen for New Messages:**
```javascript
socket.on('new-message', (message) => {
  console.log(message);
});
```

---

## Error Responses

All errors return appropriate HTTP status codes:

```json
{
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

All endpoints are rate-limited to prevent abuse. Limits will be specified in response headers.
