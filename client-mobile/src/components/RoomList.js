import React from "react";
import { Button, View } from 'react-native';

const RoomList = ({ data, selectedId, onItemClick }) => (
	// <Dropdown text={ data.filter(item => item.id === selectedId)[0].name } button upward style={{ margin:"0 1em 1em 0" }}>
	// 	<Dropdown.Menu>
	// 		{ data && data.map(item => (
	// 			<Dropdown.Item key={ item.id } active={ item.id === selectedId } onClick={ () => onItemClick(item.id) }>{ item.name }</Dropdown.Item>
	// 		)) }
	// 	</Dropdown.Menu>
	// </Dropdown>
	// <View>
	// 	<Picker selectedValue={ selectedId } onValueChange={ (itemValue, itemIndex) => onItemClick(itemValue) }>
	// 		{ data && data.map(item => (
	// 			// <Dropdown.Item key={ item.id } active={ item.id === selectedId } onClick={ () => onItemClick(item.id) }>{ item.name }</Dropdown.Item>
	// 			<Picker.Item key={ item.id } label={ item.name } value={ item.id } />
	// 		)) }
	// 	</Picker>
	// </View>
	<View>
		<Button title="Learn More" onPress={ onPressLearnMore }/>
	</View>
)

export default RoomList