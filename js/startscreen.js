
function transit(from, to) {
  console.log(from);
  document.getElementById(from).style.display = 'none';
  document.getElementById(to).style.display = 'flex';
}
