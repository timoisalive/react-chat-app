import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Grid } from "semantic-ui-react";
import InputForm from "./components/InputForm";
import MessageListContainer from "./components/MessageListContainer";
import RoomListContainer from "./components/RoomListContainer";
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
				<Grid centered className="full-height">
					<Grid.Column mobile={14} tablet={10} computer={8} largeScreen={6} widescreen={4} verticalAlign="middle">
						<InputForm label={ strings.USERNAME_LABEL } submitLabel={ strings.LOGIN } onSubmit={ this.props.onUsernameSubmit } />
					</Grid.Column>
				</Grid>
			)
		} else {
			return (
				<div ref="rootElement" className="flex-column full-height">
					<Grid centered className="flex-one">
						<Grid.Row>
							<Grid.Column mobile={16} tablet={4} computer={3} largeScreen={2} widescreen={1}>
								<RoomListContainer />
							</Grid.Column>
							<Grid.Column mobile={16} tablet={12} computer={10} largeScreen={7} widescreen={5} className="flex-column flex-one">
								<MessageListContainer onMessageSend={ this.onMessageSend }/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
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