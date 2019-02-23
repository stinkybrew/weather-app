import React, { Component } from "react";
import "./App.css";
class App extends Component {
  state = {
    temp:"",
    humidity:"",
    image:"",
    error:"",
    list: []
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
        error:""
      });
    }

    else {
      // set states to "", if error is given
      this.setState({
        image:"",
        humidity:"",
        temp:"",
        error:"Please enter city and country details correctly"
      });
    }
  }
  saveClick = () => {
    // save weather-data button to localtorage
    var fs = require('fs');
    localStorage.setItem("temp", this.state.temp)                      
    localStorage.setItem("humid", this.state.humidity)
    localStorage.setItem("weatherimg", this.state.image)

    // save data to .txt file
    fs.writeFile('savedtemp.txt', this.state.temp, function (err) {    
        if (err) 
          return console.log(err);
        console.log('file was saved!');
    }); 
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
            <div className="col-md-4"><center><img src={this.state.image} width="100px" height="100px"/><br></br><h3 id="h1">Temperature: {this.state.temp}<br></br>Humidity: {this.state.humidity}</h3></center></div>
          </div></div>:''}

          <form onClick={this.saveClick}>
            <button  id="buttonz" className="btn btn-dark">save result</button>
          </form>
        </div> 
      </center>
      </div>
    );
  }
}
export default App;