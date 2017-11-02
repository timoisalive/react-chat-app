import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import io from 'socket.io-client';
import InputForm from "./components/InputForm";
import MessageListContainer from "./components/MessageListContainer";
import * as actions from "./actions";
import * as constants from "./constants";
import * as strings from "./strings";

class Application extends React.Component {
	componentDidMount() {
		// Connect socket
		let socket = io('https://react-chat-app-yeah.herokuapp.com', {
			transports: ['websocket'] // you need to explicitly tell it to use websockets
		});
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
				<KeyboardAvoidingView behavior='padding' style={{ flex:1, justifyContent:'center', padding:10 }}>
					<InputForm placeholder={ strings.USERNAME_LABEL } submitLabel={ strings.LOGIN } autoFocus={ true } returnKeyType='go' onSubmit={ this.props.onUsernameSubmit } />
				</KeyboardAvoidingView>
			)
		} else {
			return (
				<View style={{ flex:1, padding:10 }}>
					<MessageListContainer onMessageSend={ this.onMessageSend }/>
				</View>
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