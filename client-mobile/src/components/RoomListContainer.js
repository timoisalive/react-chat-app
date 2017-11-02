import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionSheetIOS, Button } from 'react-native';
import RoomList from "./RoomList";
import * as actions from "../actions";
import * as strings from "../strings";

class RoomListContainer extends Component {
	onRoomButtonPress = () => {
		let options = this.props.rooms.map(item => item.name);
		options.push(strings.CANCEL);

		ActionSheetIOS.showActionSheetWithOptions({ options: options, cancelButtonIndex: options.length - 1 }, this.onRoomSelect);
	}

	onRoomSelect = index => {
		if(index < this.props.rooms.length) this.props.onRoomSet(this.props.rooms[index].id);
	}

	render() {
		return (
			<Button title={ this.props.rooms.filter(item => item.id === this.props.roomId)[0].name } onPress={ this.onRoomButtonPress } />
		);
	}
}

const mapStateToProps = state => {
	return {
		rooms: state.rooms,
		roomId: state.roomId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onRoomSet: roomId => {
			dispatch(actions.setRoom(roomId));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomListContainer)