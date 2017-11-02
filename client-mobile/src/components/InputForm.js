import React from "react";
import { Button, Text, TextInput, View } from 'react-native';

class InputForm extends React.Component {
	state = {input: ""};

	onInputChange = (text) => {
		this.setState({ input: text });
	}

	onFormSubmit = () => {
		let input = this.state.input.trim();
		if(!input) return;
		this.props.onSubmit(input);
		this.setState({ input: "" });
	}

	render() {
		return (
			<View style={{ flex:1, flexDirection:'row', alignItems:'center' }}>
				<Text>{ this.props.label }</Text>
				<TextInput
					style={{ flex:1, height: 40, padding: 6, borderColor: '#e0e0e0', borderWidth: 1, borderRadius: 6 }}
					value={ this.state.input }
					placeholder={ this.props.placeholder }
					autoFocus={ this.props.autoFocus != null ? this.props.autoFocus : false }
					blurOnSubmit={ this.props.blurOnSubmit != null ? this.props.blurOnSubmit : true }
					returnKeyType={ this.props.returnKeyType != null ? this.props.returnKeyType : null }
					onChangeText={ this.onInputChange }
					onSubmitEditing={ this.onFormSubmit }
				/>
				<Button title={ this.props.submitLabel } onPress={ this.onFormSubmit } />
			</View>
		);
	}
}

export default InputForm;