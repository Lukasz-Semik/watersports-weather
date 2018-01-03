import React, { Component } from 'react';
import axios from 'axios';

import { API_KEY_DEV } from '../../API_KEY_DEV';

import prepareWeatherData from '../functions/prepareWeatherData';

class Dashboard extends Component{
  constructor(props){
    super(props);

    this.state = {
      weatherByGeolocationFetched: false,
      geolocationDeniedOrErr: false,
      userCity: null,
      userCountry: null,
      weatherData: []
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
            const weatherData = prepareWeatherData(response.data.list);
            this.setState({
              weatherByGeolocationFetched: true,
              userCity: response.data.city.name,
              userCountry: response.data.city.country,
              weatherData
            }) 
          })
          .then(()=>{
            this.putCityInfoToLocalStorage();
          })
      },error=>{
        console.log(error);
        this.setState({geolocationDeniedOrErr: true})
      },{
        //geolocation options
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      })
      return; 
    }
    this.setState({geolocationDeniedOrErr: true})
  }

  putCityInfoToLocalStorage(){
    if(!localStorage)
      return;
    const {userCity, userCountry} = this.state;
    const userCityInfo = JSON.stringify({userCity, userCountry});
    try{
      localStorage.setItem('userCityInfo',userCityInfo);
    }catch(e){
      //TO DO: notification. 
      console.log(e);
    }
  }

  render(){
    console.log('app state', this.state)
    console.log('storage', localStorage);
    if(this.state.weatherData.length<1){
      return(<div>Loading</div>);
    }
    return(
      <div>
 
      </div>
    );
  }
}

export default Dashboard; 