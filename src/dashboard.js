import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Col ,Container ,Row ,Button} from 'react-bootstrap';
import { fetchWeatherDataRequest } from './weather';
import {Line} from 'react-chartjs-2';
import '../node_modules/react-linechart/dist/styles.css';




class Dashboard extends Component {
  constructor(){
    super();
    this.state ={
    weather_data:{},
    location:"",
    description:"",
    todays_lowest_temperature:"",
    todays_higest_temperatue:"",
    selectValue:"94040",
    current_temperature:"",
    wind_speed:"",
    humidity:"",
    pressure:"",
    show_more_details:false,
    button:true,
  }}
 
 componentDidMount() {
        this.getWeatherData(this.state.selectValue  )
        }

getWeatherData = async (selectValue) => {
  console.log(selectValue)
  try {
    let weather_data = await fetchWeatherDataRequest(this.state.selectValue);
    this.setState({ weather_data:weather_data,
      location:weather_data.name,
      todays_higest_temperatue:weather_data.main.temp_max,
      todays_lowest_temperatue:weather_data.main.temp_min, 
      current_temperature:weather_data.main.temp,
      wind_speed:weather_data.wind.speed,
      humidity:weather_data.main.humidity,
      pressure:weather_data.main.pressure
    });
    let descriptionData=weather_data.weather.map((weather)=>{
      this.setState({
        description:weather.description
      })
      return descriptionData
    })
  } catch (error) {
    console.error(error.response);
  }
};

 handleChange=(event) =>{
  this.setState({
    selectValue: event.target.value
  })
};
  
  viewMoredetails=()=>{
    this.setState({
    show_more_details:true,
    button:false

    })

  }  
  render() {
    const data = {
      labels: ['sunday', 'Monday cold sky', 'Tuesday hot sunny ','Wednesday hot cloudy',
               'Thursday cold rain', 'Friday cold rain','Saturday cold rain' ],
      datasets: [
        {
          label: 'Temperature',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: [65, 59, 80, 81, 56,60,65]
          
        }
      ]}
    return (
    <div >
    
    <div className="text-center">
    <Container>
    <div>
      <h1 className="text-center">Weather Report</h1>
     <input type="number"
     value={this.state.selectValue} 
     onChange={this.handleChange} 
     className="dropdown"
     placeholder="Search by zipcode"/>
      <span onClick={this.getWeatherData} className="button"><button>Search</button></span>
      </div>
    <Card>
     <Card.Header as="h5">Weather Report</Card.Header>
    <Card.Body>
     <Row>
     <Col  sm={6} ><h6>Location</h6>
      <p className="text-primary"> {this.state.weather_data.name}</p>
     </Col>
     <Col  sm={6} ><p>Description</p><p className="text-primary">{this.state.description}ksjncdkj</p></Col>
     <Col sm={6} ><p>today's high temperature</p>
     <p className="text-primary">{this.state.todays_higest_temperatue}</p></Col>
     <Col  ><p>toady's low tempetraure</p><p sm={6} className="text-primary"> {this.state.todays_lowest_temperatue}</p></Col>
     <Col sm={6} > <p>current_temperature</p><p className="text-primary">{this.state.current_temperature}</p></Col>
     {this.state.button? (
     <Col sm={6} > <Button onClick={this.viewMoredetails}><strong>view more details</strong></Button></Col>):("")}

        {this.state.show_more_details ? (
    <>
     <Col sm={6} > <p>wind speed</p><p className="text-primary">{this.state.wind_speed}</p></Col>
    <Col sm={6} > <p>humidity</p><p className="text-primary">{this.state.humidity}</p></Col>
    <Col sm={6} > <p>pressure</p><p className="text-primary">{this.state.pressure}</p></Col></>):("")}
     </Row>
  </Card.Body>
   </Card>
 </Container>
</div>
      <div>
        <Line
          data={data}
          options={{
            title:{
              display:true,
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      </div>
    );
  }

};


export default Dashboard;