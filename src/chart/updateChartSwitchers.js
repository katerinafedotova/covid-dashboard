export default function updateChartSwitchers(e) {
  // check which arrow clicked
  let currentArrow = e.target;
  if (currentArrow.classList.contains('chart__right')) {
    currentArrow = 'right';
  } else {
    currentArrow = 'left';
  }
  let currentNum;
  // find the slider we want to hide
  Array.from(document.querySelectorAll('.switchers__slider__chart')).forEach((slider) => {
    if (slider.classList.contains('visible')) {
      currentNum = slider.dataset.chartnum;
      if (+currentNum === 4 && currentArrow === 'right') {
        document.querySelector(`[data-chartnum='${currentNum}']`).classList.toggle('visible');
        currentNum = 1;
      }
      if (+currentNum === 1 && currentArrow === 'left') {
        document.querySelector(`[data-chartnum='${currentNum}']`).classList.toggle('visible');
        currentNum = 4;
      }
    }
  });
  const sliderToHide = document.querySelector(`[data-chartnum='${currentNum}']`);
  console.log(sliderToHide);
  let sliderToDisplay;

  if (currentArrow === 'right' && sliderToHide.classList.contains('visible')) {
    sliderToDisplay = document.querySelector(`[data-chartnum='${+currentNum + 1}']`);
    sliderToHide.classList.toggle('visible');
  } else if (currentArrow === 'left' && sliderToHide.classList.contains('visible')) {
    sliderToDisplay = document.querySelector(`[data-chartnum='${+currentNum - 1}']`);
    sliderToHide.classList.toggle('visible');
  } else {
    sliderToDisplay = sliderToHide;
  }

  sliderToDisplay.classList.toggle('visible');
}
