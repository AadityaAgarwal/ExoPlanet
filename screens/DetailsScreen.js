import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Card, Icon } from "react-native-elements";
import axios from "axios"

export default class DetailsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            details: {},
            ImagePath: '',
            url: `http://127.0.0.1:5000/planet?name=${this.props.navigation.getParam("planet_name")}`
        }
    }
    getDetails = () => {
        const { url } = this.state
        axios.get(url)
            .then(response => { this.setDetails(response.data.data) })
            .catch(error => { Alert.alert(error.message) })
    }

    setDetails = (planet_details) => {
        const planet_type = planet_details.planet_type
        let imagePath = ""
        switch (planet_type) {
            case "Gas Giant": imagePath = require("../assets/gas_giant.png")
                break
            case "Neptune-like": imagePath = require("../assets/neptune_like.png")
                break
            case "Super Earth": imagePath = require("../assets/super_earth.png")
                break
            case "Terrestrial": imagePath = require("../assets/terrestrial.png")
                break
            default: "../assets/gas_giant.png"
        }
        this.setState({
            details: planet_details,
            ImagePath: imagePath
        })
    }
    componentDidMount() { this.getDetails() }
    render() {
        const { details, ImagePath } = this.state;
        if (details.specifications) {
            return (
                <View style={styles.container}>
                    <Card
                        title={details.name}
                        image={ImagePath}
                        imageProps={{ resizeMode: "contain", width: "100%" }}
                    ></Card>
                    <View>
                        <Text
                            style={styles.cardItem}
                        >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Gravity : ${details.gravity}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Orbital Period : ${details.orbital_period}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Orbital Speed : ${details.orbital_speed}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Planet Mass : ${details.planet_mass}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Planet Radius : ${details.planet_radius}`}</Text>
                        <Text
                            style={styles.cardItem}
                        >{`Planet Type : ${details.planet_type}`}</Text>
                    </View>
                    <View style={[styles.cardItem, { flexDirection: "column" }]}>
                        <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                        {details.specifications.map((item, index) => (
                            <Text key={index.toString()} style={{ marginLeft: 50 }}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View >
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardItem: {
        marginBottom: 10
    }
});