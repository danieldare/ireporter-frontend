const form = document.getElementById('formsubmit');

// Checking if the user just register
// if true, shows a message to the newly registered user at the login page.
const urlArr = document.referrer.split('/');
const urlMain = urlArr.includes('register.html');
document.getElementById('testme').style.display = 'none';
if (urlMain) {
  setTimeout(() => {
    document.getElementById('testme').style.display = 'block';
  }, 1000);
} else {
  document.getElementById('testme').style.display = 'none';
}

const url = 'https://ireporter-full.herokuapp.com/api/v1/auth/login';
function runSubmit(e) {
  e.preventDefault();
    loadingNow(true);

    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
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
        setTimeout(() => {
          if (response.status === 200) {
            window.location.href = 'Dashboard.html';
          }
        }, 1000);
        return response.json();
      })
      .then(data => {
        if(data.status === 200){
          document.getElementById('login-container').style.opacity = 1;
          document.getElementById('login-container').style.visibility = "visible";
        }

        if(data.data){
          const { token } = data.data[0];
          localStorage.setItem('jwtToken', token);
        }

        if( data.errors){
          loadingNow(false)
  
          data.errors.email !== undefined
            ? (document.getElementById('email-err').innerHTML = data.errors.email)
            : (document.getElementById('email-err').innerHTML = '');
          data.errors.password !== undefined
            ? (document.getElementById('password-err').innerHTML = data.errors.password)
            : (document.getElementById('password-err').innerHTML = '');
          document.getElementById('err').style.display = 'block';
          typeof data.errors == 'string'
            ? (document.getElementById('err').innerHTML = data.errors)
            : (document.getElementById('err').style.display = 'none');
        }
      })
      .catch(err => {
        return err;
      });
  
  
}

// function loading(){

// }

form.addEventListener('submit', runSubmit);


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