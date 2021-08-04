
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
require('dotenv').config();

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      locationLatitude: '',
      locationLongitude: '',
      viewMapImage: false,
      viewError: false,
      errorMessage: 'No data',
    }
  }

  submitForm = async (e) => {
    e.preventDefault();
    const location = e.target.locationName.value;
    // console.log('user Input Location: ', location);
    try{
    const response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${location}&format=json`);

    console.log('our axios response', response.data[0]);

    this.setState({
      locationData: response.data[0],
      locationLatitude: response.data[0].lat,
      locationLongitude: response.data[0].lon,
      viewMapImage: !false,
      viewError: false,
    });
    }
  catch (fault){
    this.setState(
      {
        viewError: true,
        errorMessage:`${fault.response.status} ${fault.response.data.error}`
      }
    )
  }

};

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.submitForm}>
          <label>
            Location Name:
          </label>
          <input name="locationName" type="text" placeholder="Enter the location name you want to search" />
          <input type="submit" value="search Location" />
        </form>
        <div>
          <h1>
            Location information
          </h1>
          {
           
            this.state.locationData.display_name &&
            <p>
              {this.state.locationData.display_name}, Latitude: {this.state.locationData.lat}, Longitude: {this.state.locationData.lon}
            </p>
}
        </div>
        {
              
              this.state.viewMapImage &&
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.locationLatitude},${this.state.locationLongitude}`} alt='Map' style={{ marginBlock: '2%', width: '35rem', height: '35rem' }} 
             >

              </img>
            }

<div>

{this.state.errorMessage} 

</div>
<Footer />
      </div>
    )
  }
}

export default App