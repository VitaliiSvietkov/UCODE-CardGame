function rotateCoin() {
  let coinFace = document.getElementById('coinFace');
  coinFace.style.transform = 'rotateX(1080deg)';

  let coinBack = document.getElementById('coinBack');

  // Create an effect of throwing a coin
  coinFace.style.width = '110px';
  coinFace.style.height = '110px';
  coinFace.style.right = '10px';

  coinBack.style.width = '110px';
  coinBack.style.height = '110px';
  setTimeout(() => {
    coinFace.style.width = '80px';
    coinFace.style.height = '80px';
    coinFace.style.right = '20px';
    coinBack.style.width = '80px';
    coinBack.style.height = '80px';
  }, 1000);

  // Backup to the initial state without animation
  setTimeout(() => {
    coinFace.style.transition = 'none';
    coinFace.style.transform = 'none';
  }, 2000);

  // Reset the animation
  setTimeout(() => {
    coinFace.style.transition = 'all 2s';
  }, 2100);
}
