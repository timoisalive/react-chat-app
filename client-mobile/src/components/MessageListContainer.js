import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import InputForm from "./InputForm";
import Message from "./Message";
import RoomListContainer from "./RoomListContainer";
import * as strings from "../strings";

class MessageListContainer extends Component {
	render() {
		return (
			<View style={{ flex:1 }}>
				<FlatList
					inverted={ true }
					style={{ flex:1 }}
					data={ this.props.messages.reverse() }
					renderItem={ ({item}) => <Message data={ item } username={ this.props.username } /> }
					keyExtractor={item => item.id}
				/>
				<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='20' style={{ flexDirection:'row' }}>
					<RoomListContainer />
					<InputForm placeholder='egdgedgede' submitLabel={ strings.SEND } returnKeyType='send' blurOnSubmit={ false } onSubmit={ this.props.onMessageSend } />
				</KeyboardAvoidingView>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		messages: state.messages ? state.messages.filter(message => message.roomId === state.roomId) : [],
		roomName: state.rooms && state.rooms.length ? state.rooms.filter(room => room.id === state.roomId)[0].name : "",
		username: state.username
	}
}

export default connect(mapStateToProps)(MessageListContainer);