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
          name: 'todayCases',
          value: todayCases,
        },
        {
          name: 'todayDeaths',
          value: todayDeaths,
        },
        {
          name: 'todayRecovered',
          value: todayRecovered,
        },
      ],
    };
  });
}
