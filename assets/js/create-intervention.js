const form = document.getElementById('formsubmit');

const url = 'http://localhost:5050/api/v1/interventions';
const load = document.getElementById('load-de');

function runSubmit(e) {
    e.preventDefault();
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
    //   document.getElementById('title').value = '';
    //   document.getElementById('description').value = '';
    //   document.getElementById('location').value = '';
      if (response.status === 200) {
        window.location.href = 'view-redflag-records.html';
      }
      return response.json();
    })
    .then(data => {
        load.innerText = "Submit";
        if (data.error) {
          window.location.assign('login.html');
        }
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
    })
    .catch(err => {
    
      console.log(err.response);
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
