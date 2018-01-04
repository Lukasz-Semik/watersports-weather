import moment from 'moment';

function prepareWeatherData(fetchedWeather=[]){
  console.log(moment('2018-01-04 00:00').isBetween('2018-01-03 00:00','2018-01-06','day'));
  if(fetchedWeather.length<1)
    return;
  return fetchedWeather.map(weatherItem=>{
    const notFetched = 'not fetched';
    return{
      time: weatherItem.dt ? moment.unix(weatherItem.dt) : notFetched,
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