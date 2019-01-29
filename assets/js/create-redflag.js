const form = document.getElementById('formsubmit');

const url = 'https://ireporter-full.herokuapp.com/api/v1/red-flags';
const load = document.getElementById('load-de');

const jwt = localStorage.getItem('jwtToken');
const loggedinLinks = document.getElementById('show-links');
if(jwt){
  loggedinLinks.innerHTML = `
<li><a href="dashboard.html">Dashboard</a></li>
<li><a href="profile.html">Profile</a></li>
<li><a href="#">Logout</a></li>`

}

function runSubmit(e) {
  e.preventDefault();
  loadingNow(true)
  load.innerText = "Submitting...";

  const title = document.getElementById('title').value;
  const comments = document.getElementById('description').value;
  const location = document.getElementById('location').value;
  let images = document.getElementById('images').files;
  const status = 'draft';
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('comments', comments);
  formData.append('location', location);
  formData.append('status', status);
  Array.from(images).forEach(data => {
    formData.append('images', data);
  })

  const request = new Request(url, {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'x-access-token': localStorage.jwtToken,
      Accept: 'application/json, */*'
    }),
    body: formData
  });

  // The parameters we are gonna pass to the fetch function
  fetch(request)
    .then(response => {
      //   Redirect to login
      // 
      if (response.status === 200) {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('location').value = '';
        document.getElementById('record-notification').style.opacity = 1
        document.getElementById('record-notification').style.visibility = 'visible';
      setTimeout(() => {
        document.getElementById('record-notification').style.opacity = 0
        document.getElementById('record-notification').style.visibility = 'hidden';
      },4000)

      loadingNow(false)
        // window.location.href = 'view-redflag-records.html';
      }
      return response.json();
    })
    .then(data => {
      load.innerText = "Submit";
        if (data.error) {
          window.location.assign('login.html');
        }

        if( data.errors){
          loadingNow(false)
      data.errors.title !== undefined
        ? (document.getElementById('title-err').innerHTML = data.errors.title)
        : (document.getElementById('title-err').innerHTML = '');
      data.errors.comments !== undefined
        ? (document.getElementById('description-err').innerHTML = data.errors.comments)
        : (document.getElementById('description-err').innerHTML = '');
      data.errors.location !== undefined
        ? (document.getElementById('location-err').innerHTML = data.errors.location)
        : (document.getElementById('location-err').innerHTML = '');
      // clear input fields
        }
    })
    .catch(err => {
      console.log(err);
    });
}



// Location Cordinates
const geoFind = document.getElementById('geofind');
geoFind.addEventListener('click', runFindMe);
function runFindMe() {
  const output = document.getElementById('location');

  if (!navigator.geolocation) {
    output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('location').value = `${latitude}, ${longitude}`;
  }

  function error() {
    output.innerHTML = 'Unable to retrieve your location';
  }

  output.innerHTML = '<p>Locating…</p>';

  navigator.geolocation.getCurrentPosition(success, error);
}

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