export default function cleanContainer(dataContainer) {
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }
}
