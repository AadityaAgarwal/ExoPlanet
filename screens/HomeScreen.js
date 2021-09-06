import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ListItem } from "react-native-elements" 
import axios from "axios" 

export default class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = { listData: [], url: "http://127.0.0.1:5000/" }
    }
    getPlanets = () => {
        const { url } = this.state
        axios.get(url)
            .then(response => { return this.setState({ listData: response.data.data }) })
            .catch(error => { Alert.alert(error.message) })
    }
    componentDidMount() { this.getPlanets() }

    renderItem = ({ item, index }) => {
        <ListItem
            key={index}
            title={`Planet:${item.name}`}
            subtitle={`Distance From Earth${item.distance_from_earth}`}
            //titleStyle={styles.title}
            //containerStyle={styles.ListContainer}
            bottomDivider
            chevron
            onPress={() => { this.props.navigation.navigate("Details", { planet_name: item.name }) }}></ListItem>
}
    render() {
        const { listData } = this.state
        if (listData.length == 0) { return (<View><Text>Loading...</Text></View>) }
        return (
            <View>
                <View><Text>Planets World</Text></View>
                <View><FlatList keyExtractor={index.toString()} data={this.state.listData} renderItem={this.renderItem}/></View>
            </View>
        )
    }
}