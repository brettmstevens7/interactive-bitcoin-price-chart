import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null
    }
  }
  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }
  componentDidMount(){
    const getData = () => {
      // const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';
      const url = 'http://localhost:3000/data/strava-data.json';

      fetch(url).then( r => r.json())
        .then((stravaData) => {
          const sortedData = [];
          let count = 0;
          for (let date in stravaData){
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: stravaData[date] + " miles",
              x: count, //previous days
              y: stravaData[date] // numerical price
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingData: false
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }
  render() {
    return (

      <div className='container'>
        <div className='row'>
          <h1>Miles Recorded in Strava - Last 30 Days</h1>
        </div>
        <div className='row'>
          { !this.state.fetchingData ?
          <InfoBox data={this.state.data} />
          : null }
        </div>
        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className='row'>
          <div className='chart'>
            { !this.state.fetchingData ?
              <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
              : null }
          </div>
        </div>
        <div className='row'>
          <div id="coindesk"> Powered by <a href="https://media.giphy.com/media/3ofT5SAruPuAqHEQNy/giphy.gif">Elves</a></div>
        </div>
      </div>

    );
  }
}

export default App;
