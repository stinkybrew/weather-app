import React, { Component } from "react";
import "./App.css";
import backimg from './images/night_helsinki.jpg';
class App extends Component {
  state = {
    temp: "",
    humidity: "",
    image: "",
    location: "",
    error: ""
  }
  handleClick = async(e) => {
    // Get weather button handler
    e.preventDefault();
    let apiKey = '73b0005b139fa130';
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      const api = await fetch(`http://api.wunderground.com/api/${apiKey}/conditions/q/${country}/${city}.json`); 
      const data = await api.json();
      if (data.response.current_observation || !data.response.error) {
        // if city and country are inserted correctly...
        this.setState({
          temp: data.current_observation.temp_c,
          humidity: data.current_observation.relative_humidity,
          image: data.current_observation.icon_url,
          location: data.current_observation.display_location.full,
          error: ""
        });
      }
      else {
        // if 1 of the inputs is incorrect
        this.setState({
          error: "Please fill input fields correctly"
        });
      }
    }
    else {
      // Gives error if theres a empty input field
      this.setState({
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
      imagew: this.state.image
    }
    localStorage.setItem("datas", JSON.stringify(obj));
    alert("Weather data saved to localstorage");
  }
  
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
            <input type="text" placeholder="enter country" id="Country" name="country" className="form-control"></input><br></br>
            <button className="btn btn-outline-primary">Get weatherforecast</button>
          </form>
          {this.state.error!==''?<div class="alert alert-danger" role="alert">{this.state.error}</div>:''}
          {this.state.temp!==''?
          <div id="bck"><div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4"><center><h4><b>{this.state.location}</b></h4><img alt="saa" src={this.state.image} width="80px" height="80px"/><h3 id="h1">Temperature: {this.state.temp}&deg;c<br></br>Humidity: {this.state.humidity}</h3></center></div>
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
