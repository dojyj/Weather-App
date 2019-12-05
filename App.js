import React from 'react';
import {Alert} from 'react-native'
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "241051bf13976dd3ddf8b8d9f247255e"

export default class extends React.Component {
  state ={
    isLoading: true
  };

  getWeather = async(latitude, longitude) => {
    const {
      data : {
        main: {temp},
        weather
      }
     } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
  };
  getLoaction = async() => {
    try {
      await Location.requestPermissionsAsync()
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude,longitude);

    } catch (e) {
      Alert.alert("sorry ㅜㅜ","I cant find your location!!!");
    };
  }

  componentDidMount(){
    this.getLoaction();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (<Loading />) : (
      <Weather temp={Math.round(temp)} condition={condition} />
  );
  }
}
