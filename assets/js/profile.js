


  
  
  const url = 'http://localhost:5050/api/v1/incident';
  const incidentRecords = document.getElementById('mytable');
  const redflagsErr = document.getElementById('display-err');
  const load = (records) => {
  
    records.forEach((record, index) => {
      const title = record.title;
      const status = record.type;
      const mainId = record.id;
      const id = index + 1;
  
      document.getElementById("mytable").style.opacity = 1;
      const allRecords = `
        <td>${id}</td>
        <td>${title}</td>
        <td>
         ${status}
        </td>
        <td>
         <a href="view-one-redflag.html?id=${mainId}" class="view-more">View Details</a>
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

    document.getElementById('draft').innerText = redFlagDraft;
    document.getElementById('resolved').innerText = redFlagResolved;
    document.getElementById('rejected').innerText = redFlagRejected;
    document.getElementById('under-investigation').innerText = redFlagInvestigation;



    const request = new Request(url, {
      headers: new Headers({
        'x-access-token': localStorage.jwtToken
      })
    });
    // The parameters we are gonna pass to the fetch function
    document.getElementById('loading-v2').style.opacity = 0.6;
    document.getElementById('loading-data').innerHTML = `Loading...`

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error || localStorage.jwtToken === undefined) {
          window.location.assign('login.html');
        }
        document.getElementById('loading-data').style.display = "none";
        const records = data.data;
        if(records.length !== 0){
          document.getElementById('loading-v2').style.opacity = 0;
          load(records)
        }
        else{
            redflagsErr.innerHTML = `
           <h2 class="error-exp">Oops!</h2>
         <p class="err-msg">No record found!</p>
         <a href="dashboard.html" class="bt bt-blue bt-err" > return to dashboard</a>`
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



function loadWindow1() {
    const url = 'http://localhost:5050/api/v1/auth/current';

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
          console.log(data)
          document.getElementById('name').innerText = data.firstname + " " + data.lastname;
          document.getElementById('email').innerText = data.email;
          document.getElementById('phonenumber').innerText = data.number;
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




window.addEventListener('load', loadWindow1)
  window.addEventListener('load', loadWindow);
  