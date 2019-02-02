const defaultRecords = () => {
  localStorage.setItem('redflag-total', 0);
  localStorage.setItem('redflag-draft', 0);
  localStorage.setItem('redflag-investigation', 0);
  localStorage.setItem('redflag-resolved', 0);
  localStorage.setItem('redflag-rejected', 0);
}


const url = 'https://ireporter-full.herokuapp.com/api/v1/red-flags';
const redflagsRecord = document.getElementById('display-redflag');
const redflagsErr = document.getElementById('display-err');

const load = (records) => {

  const total = records.length;
  let draftCount = 0;
  let investigationCount = 0;
  let resolvedCount = 0;
  let rejectedCount = 0;

  records.forEach(record => {
    const title = record.title;
    const comments = record.comments;
    const createdon = record.createdon;
    const status = record.status;
    const id = record.id;
    const location = record.location;
    let color = '';

      if (status === 'resolved') {
        resolvedCount += 1;
        color = 'green';
      } else if (status === 'rejected') {
        rejectedCount += 1;
        color = '#C07079';
      } else if (status === 'under-investigation') {
        investigationCount += 1;
        color = 'yellow';
      } else {
        color = 'slategrey';
        draftCount += 1;
      }

      localStorage.setItem('redflag-total', total);
      localStorage.setItem('redflag-draft', draftCount);
      localStorage.setItem('redflag-investigation', investigationCount);
      localStorage.setItem('redflag-resolved', resolvedCount);
      localStorage.setItem('redflag-rejected', rejectedCount);

    document.getElementById("display-redflag").style.opacity = 1;
    const recordDetails = `
    <div class="redflag-record" id="redflag-record">
      <div class="status__name" style="background-color:${color}">${status}</div>
      <div>
        <p>Report CreatedAt</p>
        <small>${createdon}</small>
      </div>
      <div>
        <p>Issue</p>
        <small id="title">${title}</small>
      </div>
      <div>
        <p>Location</p>
        <small>${location}</small>
      </div>
      <div>
        <a href="view-one-redflag.html?id=${id}" class="bt bt-red" >view Details</a>
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
    const jwt = localStorage.jwtToken
    if (!jwt || data.error.includes('JWT')) {
      window.location.assign('login.html');
    }
      const records = data.data;
      if(data.status === 200 && records instanceof Array ){
        document.getElementById('loading').style.opacity = 0;
        document.getElementById('loading').style.visibility = "hidden";
        document.getElementById('load-id').style.visibility = "hidden";
        document.getElementById('load-id').style.opacity = 0;
        load(data.data);
      }
      if(data.error === 'No red-flag Found' && data.status === 400){
        document.getElementById('loading').style.opacity = 0;
        document.getElementById('loading').style.visibility = "hidden";
        document.getElementById('load-id').style.visibility = "hidden";
        document.getElementById('load-id').style.opacity = 0;
      redflagsErr.style.opacity = 1;
          defaultRecords();
          redflagsErr.innerHTML = `
          <h2 class="error-exp">Oops</h2>
       <p class="err-msg">No red-flag record!</p>
       <a href="create-redflag.html" class="bt bt-blue bt-err" >Create redflag record</a>`
      }

    })
    .catch(err => {
      document.getElementById('loading').style.opacity = 0;
      document.getElementById('loading').style.visibility = "hidden";
      document.getElementById('load-id').style.visibility = "hidden";
      document.getElementById('load-id').style.opacity = 0;
      redflagsErr.style.opacity = 1;

       redflagsErr.innerHTML = `
         <h2 class="error-exp">Oops!!!</h2>
       <p class="err-msg">Connection failed! Kindly try again</p>
       <a href="view-redflags.html" class="bt bt-blue bt-err" >Try again</a>`
    });
}

window.addEventListener('load', loadWindow);
