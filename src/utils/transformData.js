export default function transformData(data) {
  return data.map((info = {}) => {
    const {
      country, cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
    } = info;
    const { countryInfo = {} } = info;
    const { flag } = countryInfo;
    return {
      country,
      population,
      flag,
      properties: [
        {
          name: 'cases',
          value: cases,
        },
        {
          name: 'deaths',
          value: deaths,
        },
        {
          name: 'recovered',
          value: recovered,
        },
        {
          name: 'today Cases',
          value: todayCases,
        },
        {
          name: 'today Deaths',
          value: todayDeaths,
        },
        {
          name: 'today Recovered',
          value: todayRecovered,
        },
      ],
    };
  });
}
