import React, { Component } from "react";
import "./App.css";
class App extends Component {
  state = {
    temp:"",
    humidity:"",
    image:"",
    location:"",
    error:"",
  }
  handleClick = async(e) => {
    // Get weather button handler
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      // if city and country are inserted correctly...
      const api = await fetch(`http://api.wunderground.com/api/73b0005b139fa130/conditions/q/${country}/${city}.json`); 
      const data = await api.json();
      this.setState({
        temp:data.current_observation.temp_c,
        humidity:data.current_observation.relative_humidity,
        image:data.current_observation.icon_url,
        location:data.current_observation.display_location.full,
        error:""
      });
    }
    else {
      // sets states to "", if error is given
      this.setState({
        image:"",
        humidity:"",
        temp:"",
        location:"",
        error:"Please enter city and country details correctly"
      });
    }
  }

  displayData = async (c) => {
  
    // Display saved data
    try {
      const datas = await localStorage.getItem("datas");
      const parser = JSON.parse(datas);
      alert(parser.datas);
    }
    catch (error) {
      alert(error);
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
  }
  
  render() {
    return (
      <div className="container">
      <center>
        <div className="card" id="card1">
        <h1>Global weather app</h1>
          <form onSubmit={this.handleClick}>
            <input type="text" placeholder="enter city" id="City" name="city" className="form-control"></input><br></br>
            <input type="text" placeholder="enter country" id="Country" name="country" className="form-control"></input><br></br>
            <button className="btn btn-info">Get weatherforecast</button>
          </form>
          {this.state.temp!==''?
          <div id="bck"><div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4"><center><h4><b>{this.state.location}</b></h4><img alt="saa" src={this.state.image} width="100px" height="100px"/><h3 id="h1">Temperature: {this.state.temp}&deg;c<br></br>Humidity: {this.state.humidity}</h3></center></div>
          </div></div>:''}
          <form>
            <button onClick={this.saveClick} className="btn btn-dark">Save result's to storage</button>
            <button onClick={this.displayData} className="btn btn-dark">display saved data</button>
          </form>
       
        </div> 
      </center>
      </div>
    );
  }
}
export default App;
