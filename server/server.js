const constants = require("./constants");
const server = require("http").createServer();
const io = require("socket.io")(server);
let rooms = [];
let messages = [];
let idCounter = 0;

function pushMessage(message) {
	console.log("pushMessage");
	// Save message and emit to clients
	message.id = "message" + idCounter++;
	message.timestamp = new Date().getTime();
	messages.push(message);
	io.emit(constants.MESSAGE_RECEIVE, message);
}

function onServerListening() {
	console.log("onServerListening");
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

// Start by listening to server
server.listen(3001, onServerListening);
