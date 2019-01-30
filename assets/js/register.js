const form = document.getElementById('formsubmit');

form.addEventListener('submit', runSubmit);

const urlM = document.location.href.split('/');
const urlRegister = urlM.includes('register.html')
const jwt = localStorage.getItem('jwtToken');

if(jwt && urlRegister){
  window.location.href = 'dashboard.html';
}

const url = 'https://ireporter-full.herokuapp.com/api/v1/auth/signup';
function runSubmit(e) {
  e.preventDefault();
  loadingNow(true);

  const formData = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    othernames: document.getElementById('othernames').value,
    email: document.getElementById('email').value,
    phonenumber: document.getElementById('phonenumber').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    password2: document.getElementById('password2').value
  };
  // The parameters we are gonna pass to the fetch function
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      //   Redirect to login
      if (response.status === 201) {
        window.location.href = 'login.html';
      }
      return response.json();
    })
    .then(data => {
      if(data.status === 201){
        document.getElementById('login-container').style.opacity = 1;
        document.getElementById('login-container').style.visibility = "visible";
      }
      loadingNow(false);
      data.errors.firstname !== undefined
        ? (document.getElementById('firstname-err').innerHTML = data.errors.firstname)
        : (document.getElementById('firstname-err').innerHTML = '');
      data.errors.lastname !== undefined
        ? (document.getElementById('lastname-err').innerHTML = data.errors.lastname)
        : (document.getElementById('lastname-err').innerHTML = '');
      data.errors.othernames !== undefined
        ? (document.getElementById('othernames-err').innerHTML = data.errors.othernames)
        : (document.getElementById('othernames-err').innerHTML = '');
      data.errors.email !== undefined
        ? (document.getElementById('email-err').innerHTML = data.errors.email)
        : (document.getElementById('email-err').innerHTML = '');
      data.errors.phonenumber !== undefined
        ? (document.getElementById('phonenumber-err').innerHTML = data.errors.phonenumber)
        : (document.getElementById('phonenumber-err').innerHTML = '');
      data.errors.username !== undefined
        ? (document.getElementById('username-err').innerHTML = data.errors.username)
        : (document.getElementById('username-err').innerHTML = '');
      data.errors.password !== undefined
        ? (document.getElementById('password-err').innerHTML = data.errors.password)
        : (document.getElementById('password-err').innerHTML = '');
      data.errors.password2 !== undefined
        ? (document.getElementById('password2-err').innerHTML = data.errors.password2)
        : (document.getElementById('password2-err').innerHTML = '');
        typeof data.errors == 'string'
        ? (document.getElementById('err').innerHTML = data.errors)
        : (document.getElementById('err').style.display = 'none');
        document.getElementById('err').scrollIntoView();
    })
    .catch(err => {
      return err;
    });
}

function loadingNow(bool){
  if(bool === true){
    document.getElementById('loading-container').style.opacity = 1;
    document.getElementById('loading-container').style.visibility = 'visible';
  }
  if(bool === false){
    document.getElementById('loading-container').style.opacity = 0;
    document.getElementById('loading-container').style.visibility = 'hidden';
  }
}
