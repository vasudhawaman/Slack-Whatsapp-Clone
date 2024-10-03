const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

// Serve the React frontend (assuming it's built into a 'build' folder)
app.use(express.static(path.join(__dirname, 'build')));

// PeerJS server setup
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  path: '/peerjs',
  secure: true, // Enable secure connections if your site is running HTTPS
});

// Attach PeerJS to the Express app
app.use('/peerjs', peerServer);

// Fallback route to serve the frontend for any unmatched routes
