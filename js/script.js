function rotate() {
  let cointFace = document.getElementById('coinFace');
  cointFace.style.transform = 'rotateX(1080deg)';

  let coinBack = document.getElementById('coinBack');

  // Create an effect of throwing a coin
  cointFace.style.width = '130px';
  cointFace.style.height = '130px';
  coinBack.style.width = '130px';
  coinBack.style.height = '130px';
  setTimeout(() => {
    cointFace.style.width = '100px';
    cointFace.style.height = '100px';
    coinBack.style.width = '100px';
    coinBack.style.height = '100px';
  }, 1000);

  // Backup to the initial state without animation
  setTimeout(() => {
    cointFace.style.transition = 'none';
    cointFace.style.transform = 'none';
  }, 2000);

  // Reset the animation
  setTimeout(() => {
    cointFace.style.transition = 'all 2s';
  }, 2100);
}