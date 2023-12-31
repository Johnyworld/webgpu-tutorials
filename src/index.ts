console.log('hello world !!');
var body = document.querySelector('body');
if (body) {
  if (navigator?.gpu) {
    body.innerHTML = 'GPU loaded';
  } else {
    body.innerHTML = 'GPU not supported';
  }
}
