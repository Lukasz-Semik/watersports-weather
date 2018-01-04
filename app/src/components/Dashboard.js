import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

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
    let lastFetchTime;
    try{
      lastFetchTime = JSON.parse(localStorage.getItem('timeOfWeatherForStorage'));
    }catch(e){
      lastFetchTime = null;
    }
    // Block of code created to be compliant with 
    // API and do not trigger the same req more often than 10 minutes
    const storageTime = moment(lastFetchTime).add(10,'m')
    const currentTime = moment()
    const isDelayedEnough = !lastFetchTime ? true : storageTime.isBefore(currentTime,'m');
    console.log(isDelayedEnough);
    if(!isDelayedEnough){
      console.log('we cannot fetch');
    }
    if('geolocation' in navigator && isDelayedEnough){
      console.log('we can fetch');
      this.geolocationFetching(API_URL);
      return; 
    }
    this.setState({geolocationDeniedOrErr: true})
  }

  geolocationFetching(apiUrl){
    navigator.geolocation.getCurrentPosition(position=>{
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(lat, lon);
      const query = `${apiUrl}lat=${lat}&lon=${lon}&APPID=${API_KEY_DEV}`
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
  };

  putCityInfoToLocalStorage(){
    if(!localStorage)
      return;
    const weatherDataForStorage = JSON.stringify({...this.state});
    const timeOfWeatherForStorage = JSON.stringify(moment());
    try{
      localStorage.setItem('weatherDataForStorage', weatherDataForStorage);
      localStorage.setItem('timeOfWeatherForStorage', timeOfWeatherForStorage);
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