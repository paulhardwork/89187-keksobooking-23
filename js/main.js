//Cлучайное целое число в заданном диапазоне
function getRandomNumber (min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));
  if (min >= max) {
    return 'Верхняя граница диапазона должна быть больше, чем меньшая!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber(100, 200);

function getFloatRandom (min, max, afterComma) {
  const result = Math.random() * (max - min + 1) + min;
  return Number(result.toFixed(afterComma));
}
getFloatRandom(55.5, 234.2, 3);

