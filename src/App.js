import React from "react";
import Info from "./Components/info"
import Form from "./Components/form"
import Weather from "./Components/weather"
import FormApp from "./Components/form";

const API_KEY = "6e52968c1a415b70379607430bfd9e7d";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value

    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var newData = new Date();
      newData.setTime(sunset);
      var sunset_data = newData.getHours() + ":" + newData.getMinutes();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_data,
        error: ""
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Write City Name"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5">
                <Info />
              </div>
              <div className="col-xs-5">
                <FormApp weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App