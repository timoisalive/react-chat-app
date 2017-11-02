import React from "react";
import { Text, View } from 'react-native';

const Message = ({ data, username }) => {
	const formatDate = date => {
		const pad = n => n < 10 ? "0" + n : n;
		return pad(date.getHours()) + ":" + pad(date.getMinutes());
	}

	const alignSelf = { alignSelf: data.username === username ? 'flex-end' : 'flex-start' };
	const textAlign = { textAlign: data.username === username ? 'right' : 'left' };

	const getColor = (username1, username2) => username1 === username2 ? "green" : "blue"

	return (
		<View style={{ backgroundColor:'#ffffff', alignItems:'center', marginBottom:10 }}>
			<View style={ [alignSelf, { padding:6, borderColor:'#e0e0e0', borderWidth:1, borderRadius:6, alignItems:'stretch'}] }>
				<Text style={ [textAlign, { fontWeight:'bold' }] }>{ data.username }</Text>
				<Text style={ [textAlign, { fontSize:16 }] }>{ data.text }</Text>
				<Text style={ [textAlign, { fontSize:14, color:'#b0b0b0' }] }>{ formatDate(new Date(data.timestamp)) }</Text>
			</View>
		</View>
	)
}

export default Message