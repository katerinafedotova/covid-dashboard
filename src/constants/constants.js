const statsArray = [
  [20000, 20000, 100000, 500000, 1000000, 2000000],
  [200, 200, 1000, 3000, 20000, 100000],
  [5000, 5000, 25000, 70000, 150000, 1000000],
  [100, 100, 1000, 3000, 10000, 20000],
  [5, 5, 10, 50, 100, 200],
  [100, 100, 500, 15000, 5000, 10000],
  [100, 100, 1000, 3000, 4000, 5000],
  [5, 5, 10, 30, 50, 100],
  [50, 50, 500, 1000, 2000, 3500],
  [5, 5, 10, 20, 40, 60],
  [0.5, 0.5, 1, 2, 3, 4],
  [5, 5, 10, 15, 30, 40],
];
const colors = ['#e31a1c', '#a6cee3', '#31a354', '#ca81b2f2', '#1f78b4', '#bf7473', '#fdbf6f', '#cab2d6', '#FFEB3B', '#6a3d9a', '#3e36c3', '#ff7f00'];
const sizeInEm = [0.7, 1.2, 1.7, 2.2, 2.7, 3.2];
const labelNames = ['Cases', 'Deaths', 'Recovered', 'Cases per Day', 'Deaths per Day', 'Recovered per Day', 'Cases per 100k', 'Deaths per 100k', 'Recovered per 100k', 'Cases per Day per 100k', 'Deaths per Day per 100k', 'Recovered per Day per 100k'];

export {
  statsArray, colors, sizeInEm, labelNames,
};
