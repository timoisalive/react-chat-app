const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const PORT = process.env.PORT || 3001;
const constants = require("./constants");

let rooms = [];
let messages = [];
let idCounter = 0;

function pushMessage(message) {
	console.log("pushMessage:", message);
	// Save message and emit to clients
	message.id = "message" + idCounter++;
	message.timestamp = new Date().getTime();
	messages.push(message);
	io.emit(constants.MESSAGE_RECEIVE, message);
}

function onServerListening() {
	console.log("onServerListening, port:", PORT);
	// Create a few rooms
	rooms.push({ id: "room" + idCounter++, name: "Room 1" });
	rooms.push({ id: "room" + idCounter++, name: "Room 2" });
	rooms.push({ id: "room" + idCounter++, name: "Room 3" });
	// Wait for sockets to connect
	io.on("connection", onSocketConnect);
}

function onSocketConnect(socket) {
	console.log("onSocketConnect");
	// Emit rooms to the client
	for (var i = 0; i < rooms.length; i++) {
		io.emit(constants.ROOM_RECEIVE, rooms[i]);
	}
	// Listen for new messages being sent by client
	socket.on(constants.MESSAGE_SEND, pushMessage);
}

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, "../client/build")));
// All remaining requests return the React app, so it can handle routing
app.get("/", function(request, response){
	response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Start by listening to server
server.listen(PORT, onServerListening);
