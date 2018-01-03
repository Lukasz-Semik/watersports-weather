import React, { Component } from 'react';
import axios from 'axios';

import Background from './components/Background';
import { API_KEY_DEV } from '../API_KEY_DEV';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      weatherByGeolocationTried: false,
      weatherByGeolocationFetched: false,
      userCity: null,
      userCountry: null
    }
  }
  componentDidMount(){
    const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(position=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
        const query = `${API_URL}lat=${lat}&lon=${lon}&APPID=${API_KEY_DEV}`
        axios.get(query)
          .then(response=>{
            console.log(response.data);
            this.setState({
              weatherByGeolocationFetched: true,
              userCity: response.data.city.name,
              userCountry: response.data.city.country
            }) 
          })
          .then(()=>{
            console.log('geolocation state is done');
          })
      })
    }
    this.setState({
      weatherByGeolocationTried: true
    })
  }
  render(){
    console.log('app state', this.state)
    return(
      <div>
        <Background />
      </div>
    );
  }
}

export default App; 