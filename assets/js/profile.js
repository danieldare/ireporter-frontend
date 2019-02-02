


  
  
  const url = 'https://ireporter-full.herokuapp.com/api/v1/incident';
  const incidentRecords = document.getElementById('mytable');
  const redflagsErr = document.getElementById('display-err');
  const load = (records) => {
  
    records.forEach((record, index) => {
      const title = record.title;
      const status = record.type;
      const mainId = record.id;
      const id = index + 1;

      if(status === 'red-flag'){
          statusNew = 'redflag';
        }
      if(status === 'intervention'){
            statusNew = 'intervention';
      }
  
      document.getElementById("mytable").style.opacity = 1;
      const allRecords = `
        <td>${id}</td>
        <td>${title}</td>
        <td>
         ${status}
        </td>
        <td>
         <a href="view-one-${statusNew}.html?id=${mainId}" class="view-more">View Details</a>
        </td>

      `
      incidentRecords.innerHTML += allRecords;
      
  
    })
} 
  
  
  function loadWindow() {

    const token = localStorage.getItem('jwtToken');
    const redFlagTotal = localStorage.getItem('redflag-total');
    const redFlagDraft = localStorage.getItem('redflag-draft');
    const redFlagInvestigation = localStorage.getItem('redflag-investigation');
    const redFlagResolved = localStorage.getItem('redflag-resolved');
    const redFlagRejected = localStorage.getItem('redflag-rejected');

    const interventionInvestigation =  localStorage.getItem('intervention-investigation');
    const interventionDraft =  localStorage.getItem('intervention-draft');
    const interventionResolved = localStorage.getItem('intervention-resolved');
    const interventionRejected = localStorage.getItem('intervention-rejected');

    document.getElementById('Rdraft').innerText = redFlagDraft;
    document.getElementById('Rresolved').innerText = redFlagResolved;
    document.getElementById('Rrejected').innerText = redFlagRejected;
    document.getElementById('Runder-investigation').innerText = redFlagInvestigation;

    document.getElementById('Idraft').innerText = interventionDraft;
    document.getElementById('Iresolved').innerText = interventionResolved;
    document.getElementById('Irejected').innerText = interventionRejected;
    document.getElementById('Iunder-investigation').innerText = interventionInvestigation;






    const request = new Request(url, {
      headers: new Headers({
        'x-access-token': localStorage.jwtToken
      })
    });
    // The parameters we are gonna pass to the fetch function
    document.getElementById('loading-v2').style.opacity = 0.7;
    document.getElementById('loading-data').innerHTML = `Loading...`

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const jwt = localStorage.jwtToken
        if (!jwt) {
          window.location.assign('login.html');
        }
        document.getElementById('loading-data').style.display = "none";
        const records = data.data;
        if(data.status === 200 && records instanceof Array ){
          document.getElementById('loading-v2').style.opacity = 0;
          load(records)
        }
        
        if(data.error === 'No record found' && data.status === 400){
          document.getElementById('loading-v2').style.opacity = 0;
        document.getElementById('loading-data').style.display = "block";

          document.getElementById('loading-data').innerHTML = `
           <h2 class="error-exp">Oops!</h2>
         <p class="err-msg">No record found!</p>
         <a href="dashboard.html" class="bt bt-blue bt-err" > return to dashboard</a>`
        }
  
      })
      .catch(err => {
        document.getElementById('loading').style.opacity = 0;
        redflagsErr.style.opacity = 1;
         redflagsErr.innerHTML = `
           <h2 class="error-exp">Oops!!!</h2>
         <p class="err-msg">Connection failed! Kindly try again</p>
         <a href="view-redflags.html" class="bt bt-blue bt-err" >Try again</a>`
      });
  }



function loadWindow1() {
    const url = 'https://ireporter-full.herokuapp.com/api/v1/auth/current';

    document.getElementById('name').innerHTML = `<small>loading...</small>`;
    document.getElementById('email').innerHTML =`<small>loading...</small>`;
    document.getElementById('phonenumber').innerHTML = `<small>loading...</small>`;


    const request = new Request(url, {
      headers: new Headers({
        'x-access-token': localStorage.jwtToken
      })
    });
    // The parameters we are gonna pass to the fetch function
    // document.getElementById('loading-v2').style.opacity = 0.6;
    // document.getElementById('loading-data').innerHTML = `Loading...`

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
          document.getElementById('name').innerText = data.firstname + " " + data.lastname;
          document.getElementById('email').innerText = data.email;
          document.getElementById('phonenumber').innerText = data.number;
      })
      .catch(err => {
        document.getElementById('loading').style.opacity = 0;
        redflagsErr.style.opacity = 1;
         redflagsErr.innerHTML = `
           <h2 class="error-exp">Oops!!!</h2>
         <p class="err-msg">Connection failed! Kindly try again</p>
         <a href="view-redflags.html" class="bt bt-blue bt-err" >Try again</a>`
      });
  }




window.addEventListener('load', loadWindow1)
  window.addEventListener('load', loadWindow);
  