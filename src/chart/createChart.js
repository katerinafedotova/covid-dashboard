import Chart from 'chart.js';
import { colors, labelNames } from '../constants/constants';

let ctx = document.getElementById('myChart');

export default function createChart(chartData, targetId = 0) {
  const canvasContainer = document.querySelector('.canvas');
  while (canvasContainer.firstChild) {
    if (canvasContainer.firstChild !== 'canvas') { canvasContainer.removeChild(canvasContainer.firstChild); }
  }
  canvasContainer.innerHTML += '<canvas id="myChart" height="220" width = "320"></canvas>';
  ctx = document.getElementById('myChart');
  const updateData = [];
  const casesData = [];
  const deathsData = [];
  const recoveredData = [];
  const casesPerDay = [];
  const deathsPerDay = [];
  const recoveredPerDay = [];
  const population = 7800000000;
  chartData.map((el) => updateData.push(el.last_update.substr(0,
    el.last_update.length - 9)));

  chartData.map((el) => casesData.push(el.total_cases));
  chartData.map((el) => deathsData.push(el.total_deaths));
  chartData.map((el) => recoveredData.push(el.total_recovered));

  let casesDataToReverse = casesData.slice();
  casesDataToReverse = casesDataToReverse.reverse();
  let deathsDataToReverse = deathsData.slice();
  deathsDataToReverse = deathsDataToReverse.reverse();
  let recoveredDataToReverse = recoveredData.slice();
  recoveredDataToReverse = recoveredDataToReverse.reverse();
  for (let i = 0; i < casesDataToReverse.length; i += 1) {
    if (i === 0) {
      casesPerDay.push(casesDataToReverse[i]);
      deathsPerDay.push(deathsDataToReverse[i]);
      recoveredPerDay.push(recoveredDataToReverse[i]);
    } else {
      const caseDifference = casesDataToReverse[i] - casesDataToReverse[i - 1];
      casesPerDay.push(caseDifference);
      const deathsDifference = deathsDataToReverse[i] - deathsDataToReverse[i - 1];
      deathsPerDay.push(deathsDifference);
      const recoveredDifference = recoveredDataToReverse[i] - recoveredDataToReverse[i - 1];
      recoveredPerDay.push(recoveredDifference);
    }
  }
  casesPerDay.reverse();
  deathsPerDay.reverse();
  recoveredPerDay.reverse();

  const casesPer100kData = casesData.map((el) => ((el / population) * 100000).toFixed(2));
  const deathsPer100kData = deathsData.map((el) => ((el / population) * 100000).toFixed(2));
  const recoveredPer100kData = recoveredData.map((el) => ((el / population) * 100000).toFixed(2));
  const casesPerDayPer100kData = casesPerDay.map((el) => ((el / population) * 100000).toFixed(2));
  const deathsPerDayPer100kData = deathsPerDay.map((el) => ((el / population) * 100000).toFixed(2));
  const recoveredPerDayPer100kData = recoveredPerDay.map((el) => ((el / population)
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
    maintainAspectRatio: false,
    responsive: true,
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
    type: 'bar',
    data: baseData,
    options: chartOptions,
  });
}
