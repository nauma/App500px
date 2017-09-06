import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Button, Image, StatusBar } from 'react-native';

class HomeComponent extends Component {
	static navigationOptions = {
		title: '500px',
		headerStyle: {
			paddingTop: 15,
			height: 80
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			photos: [],
			current_page: this.props.navigation.state.page ? this.props.navigation.state.page : 1,
			max_pages: 1
		};
	}

	loadData(page) {
		return fetch('https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&page=' + page, {
						method: 'GET',
					})
					.then((res) => res.json())
					.then((responce) => {
						this.setState({ photos: responce.photos, max_pages: responce.total_pages });
						console.log('Load Photos Page "'+page+'" Success');
					});
	}

	componentDidMount() {
		this.loadData(this.state.current_page)
	}

	goNextPage(i) {
		this.setState({ current_page: this.state.current_page + 1 });
		this.loadData(this.state.current_page + 1);
	}

	goPreviousPage(i) {
		this.setState({ current_page: this.state.current_page - 1 });
		this.loadData(this.state.current_page - 1);
	}

	render() {
		return (
			<ScrollView>
				<StatusBar barStyle="dark-content" />
				<View style={HomeStyle}>
					{ this.state.photos.length <= 0
						? <Text>Loading...</Text>
						: <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 20, paddingTop: 10}}>
								{ this.state.current_page > 1 ?
									<Button title="Previous page" onPress={this.goPreviousPage.bind(this)}/>
								: null }

								<Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10 }}>Page {this.state.current_page}</Text>

								{ this.state.current_page <= this.state.max_pages ?
									<Button title="Next page" onPress={this.goNextPage.bind(this)}/>
								: null }
							</View>
					}


					{this.state.photos.map((photo, index) => 
						<Photo key={index}
									 id={photo.id}
									 author={photo.name}
									 url={photo.image_url}
									 navigate={this.props.navigation.navigate} />
					)}


				</View>
			</ScrollView>
		);
	}
}

class Photo extends Component {
	goTo() {
		this.props.navigate('Photo', { id: this.props.id, author: this.props.author });
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.goTo.bind(this)} style={BlockStyle}>
					<Image style={PhotoStyle} source={{ uri: this.props.url }} />
					<Text style={TextStyle} >{this.props.author}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const HomeStyle = {
	padding: 10,
	justifyContent: 'center',
  alignItems: 'center',
};

const PhotoStyle = {
	width: 150,
	height: 150,
	borderRadius: 150
};

const BlockStyle = {
	marginTop: 20,
	alignItems: 'center'
};

const TextStyle = {
	marginTop: 5,
	fontSize: 20
};




export default HomeComponent;