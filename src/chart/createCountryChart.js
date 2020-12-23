import Chart from 'chart.js';
import { colors, labelNames } from '../constants/constants';

let ctx = document.getElementById('myChart');
function clearChart() {
  const canvasContainer = document.querySelector('.canvas');
  while (canvasContainer.firstChild) {
    if (canvasContainer.firstChild !== 'canvas') { canvasContainer.removeChild(canvasContainer.firstChild); }
  }
  canvasContainer.innerHTML += '<canvas id="myChart" height="220" width = "320"></canvas>';
}

function addDefaultClassActive(targetId) {
  const chartSwitchers = document.querySelectorAll('.switcher__chart');
  for (let i = 0; i < chartSwitchers.length; i += 1) {
    if (chartSwitchers[i].classList.contains('active')) {
      chartSwitchers[i].classList.remove('active');
    }
  }
  chartSwitchers[targetId].classList.add('active');
}
function createCountryChart(chartData, countryPopulation, targetId = 0) {
  clearChart();
  addDefaultClassActive(targetId);

  ctx = document.getElementById('myChart');
  const casesPerDay = [];
  const deathsPerDay = [];
  const recoveredPerDay = [];
  const updateData = Object.keys(chartData.timeline.cases);
  const casesData = Object.values(chartData.timeline.cases);
  console.log(updateData);
  const deathsData = Object.values(chartData.timeline.deaths);
  const recoveredData = Object.values(chartData.timeline.recovered);

  for (let i = 0; i < casesData.length; i += 1) {
    if (i === 0) {
      casesPerDay.push(casesData[i]);
      deathsPerDay.push(deathsData[i]);
      recoveredPerDay.push(recoveredData[i]);
    } else {
      const caseDifference = casesData[i] - casesData[i - 1];
      casesPerDay.push(caseDifference);
      const deathsDifference = deathsData[i] - deathsData[i - 1];
      deathsPerDay.push(deathsDifference);
      const recoveredDifference = recoveredData[i] - recoveredData[i - 1];
      recoveredPerDay.push(recoveredDifference);
    }
  }

  const casesPer100kData = casesData.map((el) => ((el / countryPopulation) * 100000).toFixed(2));
  const deathsPer100kData = deathsData.map((el) => ((el / countryPopulation) * 100000).toFixed(2));
  const recoveredPer100kData = recoveredData.map((el) => ((el / countryPopulation)
  * 100000).toFixed(2));
  const casesPerDayPer100kData = casesPerDay.map((el) => ((el / countryPopulation)
  * 100000).toFixed(2));
  const deathsPerDayPer100kData = deathsPerDay.map((el) => ((el / countryPopulation)
  * 100000).toFixed(2));
  const recoveredPerDayPer100kData = recoveredPerDay.map((el) => ((el / countryPopulation)
     * 100000).toFixed(2));

  const statisticsArr = [casesData, deathsData, recoveredData,
    casesPerDay, deathsPerDay, recoveredPerDay,
    casesPer100kData, deathsPer100kData, recoveredPer100kData,
    casesPerDayPer100kData, deathsPerDayPer100kData, recoveredPerDayPer100kData];

  const baseData = {
    labels: updateData,
    datasets: [{
      label: labelNames[targetId],
      data: statisticsArr[targetId],
      backgroundColor: colors[targetId],
    }],
  };

  const chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 60,
        fontColor: 'black',
      },
    },
    // responsive: true,
    // maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            quarter: 'MMM YYYY',
          },
        },
      }],
    },
  };

  const lineChart = new Chart(ctx, {
    type: 'bar',
    data: baseData,
    options: chartOptions,
  });
}

function getDatesDifference() {
  const date = '2020-01-22T00:00:00.000Z';
  const currentDate = Date.parse(new Date());
  const days = (currentDate - Date.parse(date)) / 86400000;
  return Math.round(days);
}

function setErrorScreen() {
  const canvas = document.getElementById('myCanvas');
  const context = ctx.getContext('2d');
  context.font = '16px Verdana';
  context.fillText('No data available', 43, 120);
}
export default async function getChartDataPerCountry(countryName, countryPopulation, targetId) {
  const difference = getDatesDifference();
  const url = `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=${difference}`;
  try {
    const response = await fetch(url);
    const resp = await response.json();
    const chartData = resp;
    createCountryChart(chartData, countryPopulation, targetId);
  } catch (error) {
    setErrorScreen();
  }
}
