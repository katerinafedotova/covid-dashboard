function insertMark(string, pos, len) {
  return `${string.slice(0, pos)}<mark>${string.slice(pos, pos + len)}</mark>${string.slice(pos + len)}`;
}

export default function searchCountry() {
  const val = this.value.trim();
  const countries = document.querySelectorAll('.country-data-container');
  if (val !== '') {
    countries.forEach((elem) => {
      const countryName = elem.querySelector('.country-name');
      if (countryName.innerText.search(val) === -1) {
        elem.classList.add('country-data-container_hide');
        countryName.innerHTML = countryName.innerText;
      } else {
        elem.classList.remove('country-data-container_hide');
        const str = countryName.innerText;
        countryName.innerHTML = insertMark(str, countryName.innerText.search(val), val.length);
      }
    });
  } else {
    countries.forEach((elem) => {
      const countryName = elem.querySelector('.country-name');
      elem.classList.remove('country-data-container_hide');
      countryName.innerHTML = countryName.innerText;
    });
  }
}
