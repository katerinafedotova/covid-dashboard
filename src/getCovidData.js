export function getGlobalCovidData() {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then(response => {
        return response.json();
      })
      .then(respData => {
        let globalCovidData = respData;
        globalCases.innerText = globalCovidData.cases;

    });
}

async function getCountriesCovidData() {
    const url = `https://disease.sh/v3/covid-19/countries`;
    const result = await fetch(url);
    if (result.ok) {
        let countriesCovidData = await result.json();
        ///сперва сортиро=ую countriesCovidData затем закидываем в генератетабле
        generateTable(countriesCovidData);
        
    } else {
        throw new Error('oops');
    }
}