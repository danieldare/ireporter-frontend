
const parsedJwt = (token) => {
    try {
      const base64HeaderUrl = token.split('.')[0];
      const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
      const headerData = JSON.parse(window.atob(base64Header));
  
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const dataJWT = JSON.parse(window.atob(base64));
      dataJWT.header = headerData;
      return dataJWT;
    } catch (err) {
      return false;
    }
  }
  
  
const urll = window.location;
let newUrl = new URL(urll);
let searchParams = new URLSearchParams(newUrl.search);
const id = searchParams.get('id'); 
const userNameDom = document.getElementById('username');
const token = localStorage.getItem('jwtToken');
const loggedinLinks = document.getElementById('show-links');
const jwtDecoded = parsedJwt(token);
if (jwtDecoded) {
    const { username, email } = jwtDecoded;
    userNameDom.innerText = `Welcome, ${email}`;

    loggedinLinks.innerHTML = `
  <li><a href="dashboard.html">Dashboard</a></li>
  <li><a href="profile.html">Profile</a></li>
  <li><a href="#" id="logout">Logout</a></li>`;
}


const url = `https://ireporter-full.herokuapp.com/api/v1/interventions/${id}`;
const redflagsRecord = document.getElementById('display-redflag');
const redflagsErr = document.getElementById('display-err');

const load = (record) => {
    const title = record.title;
    const comments = record.comments;
    const createdon = record.createdon;
    const status = record.status;
    const location = record.location;
    // const imgUrl = record.images !== null ? record.images : ;
    let showImage = ``;
    let color = '';
    if (status === 'resolved') {
        color = 'limegreen';
      } else if (status === 'rejected') {
        color = '#C07079';
      } else if (status === 'under-investigation') {
        color = 'steelblue';
      } else {
        color = 'slategrey';
      }

    if(record.images !== null){
      const mainImg = record.images.split(',').forEach(data => {
        showImage +=  ` <div>
        <p>Image file</p>
        <img src=${data} alt="images" width="100%"/>
        </div>` 
      })
    }else{
      showImage =  ` <div style="margin: 0 auto; text-align: center">
      <p>Image file</p>
      <img src=${'https://res.cloudinary.com/decqfpglp/image/upload/v1548066557/latest.png'} alt="images" width="50%" />
      </div>`
    }

    document.getElementById("display-redflag").style.opacity = 1;
    const recordDetails = `
    <a href="#">
    <div class="redflag-record large-size" id="redflag-record" >
      <div class="status__name" style="background-color:${color}">${status}</div>
      <div>
        <p>Report CreatedAt</p>
        <small>${createdon}</small>
      </div>
      <div>
        <p>Issue</p>
        <small>${title}</small>
      </div>
      <div class="comment-area">
        <p>Comment</p>
        <small id="vir-comment">${comments}</small>
        <a onclick=toggleModalComment() class="edit-btn">edit</a>
      </div>
      <div class="location-area">
        <p>Location</p>
        <small id="vir-location">${location}</small>
        <a onclick=toggleModalLocation() class="edit-btn">edit</a>
      </div>
      ${showImage}
      <div>
        <a href="#"  onclick=toggleModal() class="bt bt-red bt-block">Delete Record</a>
      </div>
    </div>
    </a>
    `;
    redflagsRecord.innerHTML = recordDetails;
}



function loadWindow() {
  const request = new Request(url, {
    headers: new Headers({
      'x-access-token': localStorage.jwtToken
    })
  });
  // The parameters we are gonna pass to the fetch function
  document.getElementById('loading').style.opacity = 1;
  fetch(request)
    .then(response => {
      return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.opacity = 0;
        redflagsErr.style.opacity = 1;
        if(data.message){
            redflagsErr.innerHTML = `
               <h2 class="error-exp">Oops!!!</h2>
             <p class="err-msg">${data.message}</p>
             <a href="view-interventions.html" class="bt bt-blue bt-err" >View all Intervention records</a>
             `
        }
        if(data.data){
            document.getElementById('loading').style.opacity = 0;
            document.getElementById('comments').innerText = data.data[0].comments;
            document.getElementById('location').innerText = data.data[0].location;
            load(data.data[0]);
        }
    })
    .catch(err => {
      console.log(err)
            const currentUrl = window.location.href;
            document.getElementById('loading').style.opacity = 0;
            redflagsErr.style.opacity = 1;
             redflagsErr.innerHTML = `
               <h2 class="error-exp">Oops!!!</h2>
             <p class="err-msg">Connection failed! Kindly try again</p>
             <a href=${currentUrl} class="bt bt-blue bt-err" >Try again</a>
             `
    });
}

// DeleteRecord
const deleteMe = document.getElementById('delete-me').addEventListener('click', removeRecord);
function removeRecord(){
  const urll = window.location;
  let newUrl = new URL(urll);
  let searchParams = new URLSearchParams(newUrl.search);
  const id = searchParams.get('id'); 
  
  const url = `https://ireporter-full.herokuapp.com/api/v1/interventions/${id}`
  const request = new Request(url, {
    method: 'DELETE',
    headers: new Headers({
      'x-access-token': localStorage.jwtToken,
      Accept: 'application/json, */*',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({id})
  });
  // The parameters we are gonna pass to the fetch function
  document.getElementById('delete-msg').innerHTML = `<h4 style="text-align:center; color: red">Deleting...</h4>`
  fetch(request)
    .then(response => {
      if(response.status === 200){
        window.location.href = 'view-interventions.html'
      }
      return response.json();
    })
    .then(data => {
    document.getElementById('delete-msg').innerHTML = `<h4 style="text-align:center; color: green">Deleted...</h4>`

    })
    .catch(err => {
      console.log(err)
            document.getElementById('loading').style.opacity = 0;
            redflagsErr.style.opacity = 1;
             redflagsErr.innerHTML = `
               <h2 class="error-exp">Oops!!!</h2>
             <p class="err-msg">Connection failed! Kindly try again</p>
             <a href="view-one-redflag.html" class="bt bt-blue bt-err">Try again</a>
             `
    });
}


// Update Comment
const updateComment = document.getElementById('update-comment').addEventListener('click', updateRecord);
function updateRecord(e){
  e.preventDefault();
  const urll = window.location;
  let newUrl = new URL(urll);
  let searchParams = new URLSearchParams(newUrl.search);
  const id = searchParams.get('id'); 
  const comments = document.getElementById('comments').value;

  const url = `https://ireporter-full.herokuapp.com/api/v1/interventions/${id}/comment`
  const request = new Request(url, {
    method: 'PATCH',
    headers: new Headers({
      'x-access-token': localStorage.jwtToken,
      Accept: 'application/json, */*',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({id, comments})
  });
  // The parameters we are gonna pass to the fetch function
  
  modalComment.style.display = 'none';
  detachModalListeners(modalComment);
  document.getElementById('delete-msg').innerHTML = `<h4 style="text-align:center; color: orange">updating...</h4>`
  fetch(request)
  .then(response => {
   
      // if(response.status === 200){
      //   window.location.reload();
      // }
      return response.json();
    })
    .then(data => {
      console.log(data); 
      if(data.errors){
        modalComment.style.display = 'block';
        attachModalListeners(modalComment);
          document.getElementById('comment-err').innerHTML = data.errors.comments;
      }else{
        
        document.getElementById('delete-msg').innerHTML = `<h4 style="text-align:center; color: green">Updated intervention record’s comment.</h4>`;
        document.getElementById('vir-comment').innerHTML = `${comments}`
        setTimeout(() => {
          document.getElementById('delete-msg').innerHTML = ``;
        },3000)
      }

    })
    .catch(err => {
      console.log(err)
            document.getElementById('loading').style.opacity = 0;
            redflagsErr.style.opacity = 1;
             redflagsErr.innerHTML = `
               <h2 class="error-exp">Oops!!!</h2>
             <p class="err-msg">Connection failed! Kindly try again</p>
             <a href="view-one-redflag.html" class="bt bt-blue bt-err">Try again</a>
             `
    });
}

// Update Comment
const updateLocation = document.getElementById('update-location').addEventListener('click', updateRecordLocation);
function updateRecordLocation(e){
  e.preventDefault();
  const urll = window.location;
  let newUrl = new URL(urll);
  let searchParams = new URLSearchParams(newUrl.search);
  const id = searchParams.get('id'); 
  const location = document.getElementById('location').value;

  const url = `https://ireporter-full.herokuapp.com/api/v1/interventions/${id}/location`
  const request = new Request(url, {
    method: 'PATCH',
    headers: new Headers({
      'x-access-token': localStorage.jwtToken,
      Accept: 'application/json, */*',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({id, location})
  });
  // The parameters we are gonna pass to the fetch function
  
  modalLocation.style.display = 'none';
  detachModalListeners(modalLocation);
  document.getElementById('delete-msg').innerHTML = `<h4 style="text-align:center; color: orange">updating...</h4>`
  fetch(request)
  .then(response => {
   
      // if(response.status === 200){
      //   window.location.reload();
      // }
      return response.json();
    })
    .then(data => {
      if(data.errors){
        modalLocation.style.display = 'block';
        attachModalListeners(modalLocation);
          document.getElementById('location-err').innerHTML = data.errors.location;
      }else{
        document.getElementById('delete-msg').innerHTML = `<h4 style="text-align:center; color: green">Updated intervention record’s location.</h4>`;
        document.getElementById('vir-location').innerHTML = `${location}`
        setTimeout(() => {
          document.getElementById('delete-msg').innerHTML = ``;
        },3000)
      }

    })
    .catch(err => {
      console.log(err)
            document.getElementById('loading').style.opacity = 0;
            redflagsErr.style.opacity = 1;
             redflagsErr.innerHTML = `
               <h2 class="error-exp">Oops!!!</h2>
             <p class="err-msg">Connection failed! Kindly try again</p>
             <a href="view-one-redflag.html" class="bt bt-blue bt-err">Try again</a>
             `
    });
}






// Modal functionality.
const btn = document.getElementById('delete-me');
const modal = document.querySelector('.modal');
const modalComment = document.querySelector('.modal-comment');
const modalLocation = document.querySelector('.modal-location');

function attachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModal);
  modalElm.querySelector('.overlay').addEventListener('click', toggleModal);
}

function detachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').removeEventListener('click', toggleModal);
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModal);
}

function toggleModal() {
  var currentState = modal.style.display;

  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modal.style.display = 'block';
    attachModalListeners(modal);
  } else {
    modal.style.display = 'none';
    detachModalListeners(modal);  
  }
}


function attachModalListenersComment(modalElm) {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModalComment);
  modalElm.querySelector('.overlay').addEventListener('click', toggleModalComment);
}

function detachModalListenersComment(modalElm) {
  modalElm.querySelector('.close_modal').removeEventListener('click', toggleModalComment);
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModalComment);
}

function toggleModalComment() {
  var currentState = modalComment.style.display;

  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modalComment.style.display = 'block';
    attachModalListenersComment(modalComment);
  } else {
    modalComment.style.display = 'none';
    detachModalListenersComment(modalComment);  
  }
}

// Location modal
function attachModalListenersLocation(modalElm) {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModalLocation);
  modalElm.querySelector('.overlay').addEventListener('click', toggleModalLocation);
}

function detachModalListenersLocation(modalElm) {
  modalElm.querySelector('.close_modal').removeEventListener('click', toggleModalLocation);
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModalLocation);
}

function toggleModalLocation() {
  var currentState = modalLocation.style.display;

  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modalLocation.style.display = 'block';
    attachModalListenersLocation(modalLocation);
  } else {
    modalLocation.style.display = 'none';
    detachModalListenersLocation(modalLocation);  
  }
}

btn.addEventListener('click', toggleModal);
window.addEventListener('load', loadWindow);
