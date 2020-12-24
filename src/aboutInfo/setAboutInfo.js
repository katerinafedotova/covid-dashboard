const body = document.querySelector('body');
const info = document.querySelector('.info');
const overlay = document.querySelector('body > div');
export const closeAboutInfo = () => {
  info.classList.remove('visible');
  body.classList.remove('overflow-hidden');
  overlay.classList.remove('overlay');
};

export const openAboutInfo = () => {
  overlay.classList.add('overlay');
  info.classList.add('visible');
  body.classList.add('overflow-hidden');
};
