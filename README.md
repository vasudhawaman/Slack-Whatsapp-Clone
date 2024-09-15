# TalKPal

## This project integrates various technologies to create a comprehensive web application with real-time communication, authentication, and advanced multimedia features. Below is an overview of the tech stack and key functionalities implemented.

## Tech Stack
### 1.*Database*: MySQL
### 2. *Backend*: Node.js, Express,Socket.io, PeerJS
### 3. *Frontend*: React, React Hooks

## Authentication
### JWT Authentication: Secure user authentication using JSON Web Tokens.
### Google OAuth Integration: Allows users to sign in using their Google accounts.
### OTP Verification: Added layer of security for user authentication.

## Real-Time Communication
###(Socket.io: Implemented for real-time messaging capabilities.)
### 1. *Private Chat Rooms*: Enables direct messaging between users.
### 2.*Group Chats*: Facilitates communication within groups.Only the admin(one who created the group) can add users to the group.All users within group can view other users.
### 3.*Video/Audio Recording*: Supports recording of video and audio during chats.
### 4.*File Sharing*: Users can share files like images,videos audio and pdfs, with storage managed in MySQL.

## Video Calling
### PeerJS: Integrated for video calling functionality, allowing seamless peer-to-peer video communication.Both users need to be connected (chatting) to make a call.

## Advanced Multimedia Features
### 1.*Sticker Maker*: Developed using TensorFlow.js model for body-segmentation, enabling users to create personalized stickers.
### 2. *Voice-to-Text*: Implemented with React Speech Recognition for converting speech into text.
### 3.*Translation*: Added support for translating text via API integration.

## Setup and Installation
### 1. Clone the repository:
Clone the repository using the following command:
```bash
git clone https://github.com/DSC-IITI/Slack-Whatsapp-Clone.git
```
### 2. Open your terminal.
Launch your terminal application to execute the subsequent commands.

### 3. Navigating project directory
Navigate to the project directory by using following command:

```bash
cd Slack-Whatsapp-Clone
```
 ### 4. Installing all the dependencies
To install all the dependencies type following command in your terminal.

```bash
npm install
```

### 5. Start the Backend
Change to the backend directory and start the backend server:
```bash
cd server
nodemon server.js
```

### 6. Start the Frontend
Open new terminal and repeat step 3 and then type following command:
```bash
cd client
npm start
```
### 6. Start the Peer server
Open new terminal and repeat step 3 and then type following command:
```bash
cd client
peerjs --port 3001
```
### 6. Enter SQL inside mySQL workbench:Enter SQL provided in info.sql in server directory.

### 7. App is live at: [http://localhost:3000]([http://localhost:3000)

