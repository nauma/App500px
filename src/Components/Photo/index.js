import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StatusBar, Dimensions } from 'react-native';

class PhotoComponent extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.author,
		headerStyle: {
			paddingTop: 15,
			backgroundColor: '#2196F3',
			height: 80
		}
	});

	constructor(props) {
		super(props)

		this.state = {
			photo: {
				loaded: false
			}
		};
	}

	componentDidMount() {
		return fetch(`https://api.500px.com/v1/photos/${this.props.navigation.state.params.id}?consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF`, {
						method: 'GET',
					})
					.then((res) => res.json())
					.then((responce) => {
						this.setState({ photo: responce.photo, loaded: true });
						console.log('Load Photo №'+this.props.navigation.state.params.id+' Success');
					});
	}

	render() {
		return (
			<ScrollView>
				<StatusBar barStyle="light-content" />
				{ this.state.loaded ? <Photo image={this.state.photo.image_url} author={this.state.photo.name} /> : <Text>Loading...</Text> }
			</ScrollView>
		);
	}
}

class Photo extends Component {
	render() {
		return (
			<View style={PhotoStyle} >
				<Image style={ImageStyle} source={{uri: this.props.image}} />
				<Text style={PhotoTextStyle}>Author: {this.props.author}</Text>
			</View>
		);
	}
}

const PhotoStyle = {
	padding: 10,
	justifyContent: 'center',
  alignItems: 'center',
};

const PhotoTextStyle = {
	fontSize: 20,
	marginTop: 15
};

const ImageStyle = {
	top: -10,
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height * 0.30
};

export default PhotoComponent;