import Chart from 'chart.js';
import { colors, labelNames } from '../map/constants';

let ctx = document.getElementById('myChart');
function clearChart() {
  const canvasContainer = document.querySelector('.canvas');
  while (canvasContainer.firstChild) {
    if (canvasContainer.firstChild !== 'canvas') { canvasContainer.removeChild(canvasContainer.firstChild); }
  }
  canvasContainer.innerHTML += '<canvas id="myChart" height="220" width = "320"></canvas>';
}

function createCountryChart(chartData, countryPopulation, targetId = 0) {
  console.log(countryPopulation);
  console.log(chartData);
  clearChart();
  ctx = document.getElementById('myChart');
  const casesPerDay = [];
  const deathsPerDay = [];
  const recoveredPerDay = [];
  const updateData = Object.keys(chartData.timeline.cases);
  const casesData = Object.values(chartData.timeline.cases);
  console.log(updateData);
  const deathsData = Object.values(chartData.timeline.deaths);
  const recoveredData = Object.values(chartData.timeline.recovered);

  //   const casesDataToReverse = casesData.slice();
  //   casesDataToReverse = casesDataToReverse.reverse();
  //   let deathsDataToReverse = deathsData.slice();
  //   deathsDataToReverse = deathsDataToReverse.reverse();
  //   let recoveredDataToReverse = recoveredData.slice();
  //   recoveredDataToReverse = recoveredDataToReverse.reverse();
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
    type: 'line',
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

export default async function getChartDataPerCountry(countryName, countryPopulation, targetId) {
  const difference = getDatesDifference();
  const url = `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=${difference}`;
  fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e.message))
    .then((resp) => {
      const chartData = resp;
      createCountryChart(chartData, countryPopulation, targetId);
    });
}
