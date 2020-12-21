import Chart from 'chart.js';
import { colors, labelNames } from '../map/constants';

let ctx = document.getElementById('myChart');

export default function createChart(chartData, targetId) {
  console.log(targetId);
  if (targetId === undefined) {
    targetId = 0;
  } else {
    const canvasContainer = document.querySelector('.canvas');
    while (canvasContainer.firstChild) {
      if (canvasContainer.firstChild !== 'canvas') { canvasContainer.removeChild(canvasContainer.firstChild); }
    }
    canvasContainer.innerHTML += '<canvas id="myChart" height="220" width = "320"></canvas>';
    ctx = document.getElementById('myChart');
  }
  const updateData = [];
  const casesData = [];
  const deathsData = [];
  const recoveredData = [];
  const casesPerDay = [];
  const deathsPerDay = [];
  const recoveredPerDay = [];
  const population = 7800000000;

  chartData.reverse().map((el) => updateData.push(el.last_update.substr(0,
    el.last_update.length - 9)));
  chartData.map((el) => casesData.push(el.total_cases));
  chartData.map((el) => deathsData.push(el.total_deaths));
  chartData.map((el) => recoveredData.push(el.total_recovered));

  for (let i = 0; i < casesData.length; i += 1) {
    if (i === 0) {
      casesPerDay.push(casesData[i]);
    } else {
      const difference = casesData[i] - casesData[i - 1];
      casesPerDay.push(difference);
    }
  }

  for (let i = 0; i < deathsData.length; i += 1) {
    if (i === 0) {
      deathsPerDay.push(deathsData[i]);
    } else {
      const difference = deathsData[i] - deathsData[i - 1];
      deathsPerDay.push(difference);
    }
  }

  for (let i = 0; i < recoveredData.length; i += 1) {
    if (i === 0) {
      recoveredPerDay.push(recoveredData[i]);
    } else {
      const difference = recoveredData[i] - recoveredData[i - 1];
      recoveredPerDay.push(difference);
    }
  }
  // console.log()
  console.log(casesPerDay);
  const casesPer100kData = casesData.map((el) => ((el / population) * 100000).toFixed(2));
  const deathsPer100kData = deathsData.map((el) => ((el / population) * 100000).toFixed(2));
  const recoveredPer100kData = recoveredData.map((el) => ((el / population) * 100000).toFixed(2));

  const statisticsArr = [casesData, deathsData, recoveredData,
    casesPerDay, deathsPerDay, recoveredPerDay,
    casesPer100kData, deathsPer100kData, recoveredPer100kData];

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
