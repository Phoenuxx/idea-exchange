import React, { Component } from "react";
import { createChart } from 'lightweight-charts';
import Col from "../Col";
import Card from "../Card";
import SearchForm from "../SearchForm";
// import MovieDetail from "./MovieDetail";
import API from "../../utils/API";
// const axios = require('axios');

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  const switcherElement = document.createElement('div');
  switcherElement.classList.add('switcher');

  let intervalElements = items.map(function (item) {
    const itemEl = document.createElement('button');
    itemEl.innerText = item;
    itemEl.classList.add('switcher-item');
    itemEl.classList.add('btn-success');
    itemEl.classList.toggle('switcher-active-item', item === activeItem);
    itemEl.addEventListener('click', function () {
      onItemClicked(item);
    });
    switcherElement.appendChild(itemEl);
    return itemEl;
  });

  function onItemClicked(item) {
    if (item === activeItem) {
      return;
    }

    intervalElements.forEach(function (element, index) {
      element.classList.toggle('switcher-active-item', items[index] === item);
    });

    activeItem = item;

    activeItemChangedCallback(item);
  }

  return switcherElement;
}

const intervals = ['5M', '1D', '1W', '1M'];

let intraData = [];
let dayData = [];
let weekData = [];
let monthData = [];

let lineSeries = null;

const seriesData = new Map([
  ['5M', intraData],
  ['1D', dayData],
  ['1W', weekData],
  ['1M', monthData]
]);

const switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);

const chartElement = document.createElement('div');

const chart = createChart(chartElement, {
  width: 600,
  height: 300,
  layout: {
    backgroundColor: '#000000',
    textColor: '#d1d4dc',
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      color: 'rgba(42, 46, 57, 0.5)',
    },
  },
  priceScale: {
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
  },
  crosshair: {
    horzLine: {
      visible: false,
    },
  },
});



function syncToInterval(interval) {
  if (lineSeries) {
    chart.removeSeries(lineSeries);
    lineSeries = null;
  }
  lineSeries = chart.addAreaSeries({
    topColor: 'rgba(76, 175, 80, 0.56)',
    bottomColor: 'rgba(76, 175, 80, 0.04)',
    lineColor: 'rgba(76, 175, 80, 1)',
    lineWidth: 2,
  });
  lineSeries.setData(seriesData.get(interval));
}

syncToInterval(intervals[0]);



class GraphContainer extends Component {
  
  state = {
    search: ""
  };



  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    document.querySelector(".card-body").appendChild(chartElement);
    document.querySelector(".card-body").appendChild(switcherElement);
  };

  searchIntraDay = query => {

    API.searchIntra(query)
      .then(
        res => {
          const data = res.data;
          let timeSeries = data["Time Series (5min)"];
          let date;

          for (var timeCode in timeSeries) {
            let object = {
              time: 0,
              value: 0
            };
            date = new Date(timeCode);
            object.time = date.getTime();
            object.value = parseFloat(timeSeries[timeCode]["4. close"]);
            intraData.push(object);
          }

          // console.log(data);
          console.log("____Meta Data_____");
          console.log(data["Meta Data"]);
          // console.log("____Time Series____");
          // console.log(data["Time Series (5min)"]);
          // console.log("____Single TS______");
          // console.log(timeSeries);
          // console.log(timeSeries[timeCode]);
          // console.log("____Value__________");
          // console.log(data["Time Series (5min)"][timeSeries[9]]["4. close"]); 
          // console.log("____Object_________");
          // console.log(object);
          // console.log("____intraData_________");
          // console.log(intraData);
          this.setState({
            chartI: lineSeries.setData([
              ...intraData
            ])
          });
        })
      .catch(err => console.log(err));
  };

  searchDaily = query => {

    API.searchDaily(query)
      .then(
        res => {
          const data = res.data;
          let timeSeries = data["Time Series (Daily)"];
          let timeSeriesDate = Object.keys(timeSeries);
          for (let i = 0; i < timeSeriesDate.length; i++) {
            let object = {
              time: 0,
              value: 0
            };
            object.time = timeSeriesDate[i];
            object.value = parseFloat(timeSeries[timeSeriesDate[i]]["4. close"]);
            dayData.push(object);
            // console.log(i);
            // console.log(timeSeriesDate[i]);
            // console.log(timeSeries[timeSeriesDate[i]]["4. close"]);
            // console.log(dayData);

          }

          // console.log(data);
          console.log("____Meta Data_____");
          console.log(data["Meta Data"]);
          // console.log("____Time Series____");
          // console.log(timeSeries);
          // console.log("____Single TS______");
          // console.log(timeSeries[timeCode]);
          // console.log("____Value__________");
          // console.log(timeSeries[timeSeriesDate[0]]["4. close"]); 
          // console.log("____Object_________");
          // console.log(object);
          // console.log("____DayData___________");
          // console.log(dayData);
          this.setState({
            chartD: lineSeries.setData([
              ...dayData
            ])
          });
        }).catch(err => console.log(err));
  };

  searchWeekly = query => {

    API.searchWeekly(query)
      .then(
        res => {
          const data = res.data;
          let timeSeries = data["Weekly Time Series"];
          let timeSeriesDate = Object.keys(timeSeries);
          for (let i = 0; i < timeSeriesDate.length; i++) {
            let object = {
              time: 0,
              value: 0
            };
            object.time = timeSeriesDate[i];
            object.value = parseFloat(timeSeries[timeSeriesDate[i]]["4. close"]);
            weekData.push(object);
            // console.log(i);
            // console.log(timeSeriesDate[i]);
            // console.log(timeSeries[timeSeriesDate[i]]["4. close"]);
            // console.log(dayData);

          }

          // console.log(data);
          console.log("____Meta Data_____");
          console.log(data["Meta Data"]);
          // console.log("____Time Series____");
          // console.log(timeSeries);
          // console.log("____Single TS______");
          // console.log(timeSeries[timeSeriesDate[0]]);
          // console.log("____Value__________");
          // console.log(timeSeries[timeSeriesDate[0]]["4. close"]); 
          // console.log("____Object_________");
          // console.log(object);
          // console.log("____WeekData___________");
          // console.log(weekData);
          this.setState({
            chartW: lineSeries.setData([
              ...weekData
            ])
          });
        }).catch(err => console.log(err));
  };

  searchMonthly = query => {

    API.searchMonthly(query)
      .then(
        res => {
          const data = res.data;
          let timeSeries = data["Monthly Time Series"];
          let timeSeriesDate = Object.keys(timeSeries);
          for (let i = 0; i < timeSeriesDate.length; i++) {
            let object = {
              time: 0,
              value: 0
            };
            object.time = timeSeriesDate[i];
            object.value = parseFloat(timeSeries[timeSeriesDate[i]]["4. close"]);
            monthData.push(object);
            // console.log(i);
            // console.log(timeSeriesDate[i]);
            // console.log(timeSeries[timeSeriesDate[i]]["4. close"]);
            // console.log(dayData);

          }

          // console.log("Monthly");
          // console.log(data);
          console.log("____Meta Data_____");
          console.log(data["Meta Data"]);
          // console.log("____Time Series____");
          // console.log(timeSeries);
          // console.log("____Value__________");
          // console.log(timeSeries[timeSeriesDate[0]]["4. close"]); 
          // console.log("____Object_________");
          // console.log(object);
          // console.log("____MonthData___________");
          // console.log(monthData);
          this.setState({
            chartM: lineSeries.setData([
              ...monthData
            ])
          });
        }).catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Alpha Vantage API for the value of `this.state.search`
  handleFormMulti = event => {
    event.preventDefault();
    console.log(this.state);
    this.searchIntraDay(this.state.search);
    this.searchDaily(this.state.search);
    this.searchWeekly(this.state.search);
    this.searchMonthly(this.state.search);
  };

addToList = event => {
  // db.User.find({where: {username: req.process.username}})
  // .then(function(dbUser) {
  //   // If we were able to successfully find User, send them back to the client
  //   console.log(dbUser);
  //   res.json(dbUser);
  // })
  // .catch(function(err) {
  //   // If an error occurred, send it to the client
  //   res.json(err);
  // });
  // axios.post('localhost:27017/StockExchangeDB'), {
    
  // }
  // const itemToAdd = this.state.search
}

  render() {
    return (
      <Col size="md-8">
        <Card heading="Search a Stock">
          <SearchForm
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormMulti={this.handleFormMulti}
            handleDBAdd={this.addToList}
          />
        </Card>
      </Col>
    );
  }
}

export default GraphContainer;
