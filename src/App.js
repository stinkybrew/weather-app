import React, { Component } from 'react';
import './App.css';
class App extends Component {
  state = {
    temp:"",
    humidity:"",
    image:"",
    error:""
  }
  handleClick = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      const api = await fetch(`http://api.wunderground.com/api/73b0005b139fa130/conditions/q/${country}/${city}.json`); 
      const rtr = await api.json();
      this.setState({
        temp:rtr.current_observation.temp_c,
        humidity:rtr.current_observation.relative_humidity,
        error:""
      });
    }
    else {
      this.setState({
        image:"",
        location:"",
        temp:"",
        error:"Please enter city and country details correctly"
      });
    }
  }
  secondClick = async(e) => {
  // SOME CODE!!!
  }
  render() {
    return (
      <div className="container">
      <center>
        <div className="card" id="card1">
        <h1>Global weather forecast app</h1>
          <form onSubmit={this.handleClick}>
            <input type="text" placeholder="enter city" id="City" name="city" className="form-control"></input><br></br>
            <input type="text" placeholder="enter country" id="Country" name="country" className="form-control"></input><br></br>
            <button className="btn btn-info">Get weatherforecast</button>
          </form>
          {this.state.error!==''?<div class="alert alert-primary" role="alert">{this.state.error}</div>:''}
          {this.state.temp!==""?<h2>temp:{this.state.temp}</h2>:""}
          {this.state.humidity!==""?<h2>humidity:{this.state.humidity}</h2>:""}
          <form onSubmit={this.handleClick}>
            <button className="btn btn-light">save result</button>
          </form>
        </div> 
      </center>
      </div>
    );
  }
}

export default App;
