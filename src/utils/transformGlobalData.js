export default function transformGlobalData(data) {
  return Object.keys(data).map((info = []) => {
    const {
      cases, deaths, recovered, todayCases, todayDeaths, todayRecovered, population,
    } = info;
    return {
      population,
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
          name: 'today cases',
          value: todayCases,
        },
        {
          name: 'today deaths',
          value: todayDeaths,
        },
        {
          name: 'today recovered',
          value: todayRecovered,
        },
      ],
    };
  });
}
