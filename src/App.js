import { useState } from 'react';
import './App.css';
import Form from './Form';
import Weather from './Weather';

const key = "a75c8e7d0db2aa11235435a1d25681ed";


//http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44

function App() {

  const [state, setState] = useState({});   

  const getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    const data = await (await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`)).json();
    console.log(data);

    if (city && country) {
      setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        errot: ''
      }); 
    }
    else {
      setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        errot: "Please Enter data"
      }); 
    }
  }

  return (
    <main>
      <Form getWeather={getWeather}/>
      <Weather 
        tempreature= {state.tempreature}
        city= {state.city}
        country= {state.country}
        humidity= {state.humidity}
        description= {state.description}
        error= {state.error}
      />
    </main>
  );
}



export default App;