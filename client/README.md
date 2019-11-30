## Feature
- Login 
- Register new account
- Chat realtime with websocket 
- Send message with emoji
- Send file 
- Invite other user join chatroom
- Remove user out chatroom
- Search user with username
## Build setup
```bash
# clone project 
clone https://github.com/tjjone98/WebChat/tree/master/client
# install dependencies
npm install
# setup client 
yarn serve
```
## Framework 
- Express for back-end server
- Vuejs for font-end client
## API with localhost:8080
- auth:
    - /v1/user/login
    - /v1/user/logon
    - /v1/user/logout
- user:
    - /v1/user/current
    - /v1/user/search?text={query}
- group:
    - /v1/group
    - /v1/group/invite
    - /v1/group/remove
- message:
    - /v1/message/{id}
- room: 
    - /v1/room/info/{id}
    - /v1/room
    - /v1/room/search?text={query}
## Structure
- src:
    - assets
    - components
        - auth
            - Login
            - Register
        - chat
            - Chat
            - ChatDetail
        - error
            - Error
            - NotFound
        - layout
            - Footer
            - Navbar
        - messages
            - FileMessage
            - ImageMessage
            - Message
            - MessageInput
            - MessageList
            - TextMessage
        - profile
            - UserProfile
        - room
            - Room
            - RoomInfo
            - RoomList
            - RoomModal
    - filters
    - utils
    - views
    - vuex
    - App.vue
## License
 Copyright (c) 2019 by Vu Hai Dang 