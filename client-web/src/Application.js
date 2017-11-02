import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import InputForm from "./components/InputForm";
import MessageListContainer from "./components/MessageListContainer";
import * as actions from "./actions";
import * as constants from "./constants";
import * as strings from "./strings";

class Application extends Component {
	componentDidMount() {
		// Connect socket
		let socket = io();
		socket.on(constants.SOCKET_CONNECT, () => this.props.onSocketConnect(socket));
		socket.on(constants.ROOM_RECEIVE, this.props.onRoomReceive);
		socket.on(constants.MESSAGE_RECEIVE, this.props.onMessageReceive);
	}

	onMessageSend = messageText => {
		// Send new message to the server
		this.props.socket.emit(constants.MESSAGE_SEND, { text: messageText, username: this.props.username, roomId: this.props.roomId });
	}

	render() {
		// If username is not yet set, render username input. Otherwise render the chat rooms.
		if(this.props.username === null) {
			return (
				<div className="flex flex-col flex-center">
					<InputForm className="login-form" label={ strings.USERNAME_LABEL } submitLabel={ strings.LOGIN } onSubmit={ this.props.onUsernameSubmit } />
				</div>
			)
		} else {
			return (
				<div className="flex flex-col flex-center">
					<MessageListContainer className="flex flex-col chat-room" onMessageSend={ this.onMessageSend }/>
				</div>
			)
		}
	}
}

const mapStateToProps = state => {
	return {
		socket: state.socket,
		username: state.username,
		roomId: state.roomId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUsernameSubmit: username => {
			dispatch(actions.setUsername(username));
		},
		onSocketConnect: socket => {
			dispatch(actions.connectSocket(socket));
		},
		onRoomReceive: room => {
			dispatch(actions.receiveRoom(room));
		},
		onMessageReceive: message => {
			dispatch(actions.receiveMessage(message));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);