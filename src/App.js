import React, { Component } from "react";
import "./App.css";
import backimg from './images/night_helsinki.jpg';
class App extends Component {
  state = {
    temp: "",
    humidity: "",
    image: "",
    location: "",
    description: "",
    error: ""
  }
  handleClick = async(e) => {
    // Get weather button handler
    e.preventDefault();
    let apiKey = 'dfc5767820ab571ce33752e1e3d938cb';
    const city = e.target.elements.city.value;
    //const country = e.target.elements.country.value;
    //if(city && country){
    if(city){
      const api2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
      //console.log(api2)
      //const api = await fetch(`http://api.wunderground.com/api/${apiKey}/conditions/q/${country}/${city}.json`); 
      const data = await api2.json();
      console.log(data)
      //if (data.response || !data.response.error) {
      if (data.name) {  
        // if city and country are inserted correctly...
        this.setState({
          temp: data.main.temp,
          humidity: data.main.humidity,
          image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          location: data.name,
          description: data.weather[0].description,
          error: ""
        });
      }
      else {
        // if 1 of the inputs is incorrect
        this.setState({
          temp: "",
          humidity: "",
          image: "",
          location: "",
          description: "",
          error: "Please fill input fields correctly"
        });
      }
    }
    else {
      // Gives error if theres a empty input field
      this.setState({
        temp: "",
        humidity: "",
        image: "",
        location: "",
        description: "",
        error:"Please fill the empty input fields"
      });
    }
  }
  
  saveClick = async (a) => {
    a.preventDefault();
    // save weather-data to localstorage
    let obj = {
      location: this.state.location,
      temperature: this.state.temp,
      humidity: this.state.humidity,
      description: this.state.description,
      imagew: this.state.image
    }
    localStorage.setItem("datas", JSON.stringify(obj));
    alert("Weather data saved to localstorage");
  }
  // Place country after City in render space <input type="text" placeholder="enter country" id="Country" name="country" className="form-control"></input><br></br>
  render() {
    return (
      // render to html page
      <div className="container">
      <center>
      <img  src={backimg} width="100%" alt="weathers"/>
        <div className="card" id="card1">
        <h1>Global weather scanner</h1><br></br>
        <p><i>Helps you find weather condition in cities...</i></p>
          <form onSubmit={this.handleClick}>
            <input type="text" placeholder="enter city" id="City" name="city" className="form-control"></input><br></br>
            
            <button className="btn btn-outline-primary">Get weatherforecast</button>
          </form>
          {this.state.error!==''?<div className="alert alert-danger" role="alert">{this.state.error}</div>:''}
          {this.state.temp !==''?
          <div id="bck"><div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <center><h4><b>{this.state.location}</b></h4>
              <h4 id="h2">{this.state.description}<img alt="icon" src={this.state.image} width="80px" height="80px"/></h4>
              <h4 id="h2" pattern="^\d*(\.\d{0,2})?$">Temperature: {(this.state.temp - 273.15).toFixed(1) }&deg;c
              <br></br>Humidity: {this.state.humidity}</h4></center>
            </div>
          </div></div>:''}
          <form>
            <button onClick={this.saveClick} className="btn btn-dark">Save result to storage</button>
          </form>
        </div> 
      </center>
      </div>
    );
  }
}
export default App;
