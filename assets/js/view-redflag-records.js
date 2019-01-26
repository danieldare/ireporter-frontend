const url = 'http://localhost:5050/api/v1/red-flags';
const redflagsRecord = document.getElementById('display-redflag');
const redflagsErr = document.getElementById('display-err');
const load = (records) => {

  records.forEach(record => {
    const title = record.title;
    const comments = record.comments;
    const createdon = record.createdon;
    const status = record.status;
    const id = record.id;
    const location = record.location;
  //   const deleteBox = document.getElementById('delete-me'); 

  //   deleteBox.addEventListener('click', () => {
  //   console.log('Hello from here')
  // })
    document.getElementById("display-redflag").style.opacity = 1;
    const recordDetails = `
    <a href="#"> 
    <div class="redflag-record" id="redflag-record">
      <div class="status__name">${status}</div>
      <div>
        <p>Report CreatedAt</p>
        <small>${createdon}</small>
      </div>
      <div>
        <p>Issue</p>
        <small>${title}</small>
      </div>
      <div>
        <p>Location</p>
        <small>${location}</small>
      </div>
      <div>
        <a href="view-one-redflag.html?id=${id}" class="bt bt-blue" >view Details</a>
        <a href="#delete-modal" class="bt bt-red">Delete</a>
      </div>
    </div>
    </a>
    <div class="delete-modal" id="delete-modal">
            <div class="delete-modal__content">
                <p class="delete-modal__text">Do you want to delete this record?</p>
                <small class="delete-modal__warning">warning!!! it cannot be reversed</small>
                <div class="delete-modal__answer">
                  <a href="#" class="delete-modal__yes">Yes</a>
                  <a href="#" class="delete-modal__no">No</a>
                </div>
    </div>
    `
    redflagsRecord.innerHTML += recordDetails;
    

  })


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
      if (data.error || localStorage.jwtToken === undefined) {
        window.location.assign('login.html');
      }
      data.data.forEach(data => console.log(data))
      const records = data.data;
      if(records.length !== 0){
        document.getElementById('loading').style.opacity = 0;
        load(data.data)
      }else{

      }

    })
    .catch(err => {
      console.log(err)
      document.getElementById('loading').style.opacity = 0;
      redflagsErr.style.opacity = 1;
       redflagsErr.innerHTML = `
         <h2 class="error-exp">Oops!!!</h2>
       <p class="err-msg">Connection failed! Kindly try again</p>
       <a href="view-redflags.html" class="bt bt-blue bt-err" >Try again</a>`
    });
}

window.addEventListener('load', loadWindow);
