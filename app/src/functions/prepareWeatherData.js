function prepareWeatherData(fetchedWeather=[]){
  if(fetchedWeather.length<1)
    return;
  return fetchedWeather.map(weatherItem=>{
    const notFetched = 'not fetched';
    return{
      timeStamp: weatherItem.dt ? weatherItem.dt : notFetched,
      temperature: weatherItem.main ? weatherItem.main.temp-275.15 : notFetched,
      pressure: weatherItem.main ? weatherItem.main.pressure : notFetched,
      rain: weatherItem.rain ? weatherItem.rain['3h'] : notFetched,
      snow: weatherItem.snow ? weatherItem.snow['3h'] : notFetched,
      wind: weatherItem.wind ? weatherItem.wind : notFetched,
      weatherDescr: weatherItem.weather ? weatherItem.weather[0] : notFetched
    }
  })
}

export default prepareWeatherData; 