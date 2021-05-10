import React, {useEffect,useState} from "react"


const api = {
  key: 'key',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query,setQuery] = useState('')
  const [weather,setWeather ] = useState('')
  

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = () => {
    let datetime = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[datetime.getDay()];
    let date = datetime.getDate();
    let month = months[datetime.getMonth()];
    let year = datetime.getFullYear();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let seconds = datetime.getSeconds();

    return `${day} ${date} ${month} ${year} ${hour}:${minute}:${seconds}`
  }

  const [date,setDate] = useState(dateBuilder)

  const bgChanger = (temp) =>{
    if (typeof temp !="undefined"){
      return(temp <10 ? 'app' : 'app warm')
    }
  }

  useEffect(() => {
    const date = setTimeout(() => {
      setDate(dateBuilder());
    }, 1000);
    return () => clearTimeout(date);    
  });
  

  return (
    <div className={(typeof weather.main != 'undefined') ? bgChanger(weather.main.temp) : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..."
          onChange={e =>setQuery(e.target.value)}
          value = {query}
          onKeyPress={search}>

          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder()}</div>          
            </div>        
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}ºC</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>          
        ): ('') }
        
      </main>
    </div>
  );
}

export default App;
