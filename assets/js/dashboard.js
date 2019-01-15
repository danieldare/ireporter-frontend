const username = document.getElementById('username');

const url = 'http://localhost:5050/api/v1/auth/current';
function showUsername() {
  const request = new Request(url, {
    headers: new Headers({
      'x-access-token': localStorage.jwtToken
    })
  });
  // The parameters we are gonna pass to the fetch function
  fetch(request)
    .then(response => {
      return response.json();
    })
    .then(data => {
      username.innerText = `Welcome,  ${data.email}`;
    })
    .catch(err => {
      return err;
    });
}

username.addEventListener('click', showUsername());
