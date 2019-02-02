


  
  
  const url = 'https://ireporter-full.herokuapp.com/api/v1/all-incidents';
  const incidentRecords = document.getElementById('mytable');
//   const redflagsErr = document.getElementById('display-err');
// document.getElementById('loading-v2').style.opacity = 1;

  const load = (records) => {
    records.forEach((record, index) => {
      const title = record.title;
      const type = record.type;
      const mainId = record.id;
      const comments = record.comments;
      const status = record.status;
      const id = index + 1;

    //   const selectOption = ["draft", "under-investigation", "resolved", "rejected"]
    //     let list = '';
    //     selectOption.forEach((data, index) => {
    //         console.log(data)
    //         const selectdIf = status === data ? "selected" : "";
    //         list += `
    //                   <option value="${data}" ${selectdIf}>${data}</option>
    //                 `;
    //     })

    
      if(type === 'red-flag'){
          typeNew = 'redflag';
        }
      if(type === 'intervention'){
            typeNew = 'intervention';
      }
  
      document.getElementById("mytable").style.opacity = 1;
      const allRecords = `
        <tr  class="mt-0">
                    <td>${id}</td>
                    <td>${title}</td>
                    <td>${type}</td>
                    <td>${comments}</td>
                    <td id="mystatus">${status}</td>
                    <td>
                    <select id="me" name="status">
                        <option value="under-investigation">under-investigation</option>
                        <option value="resolved">resolved</option>
                        <option value="rejected">rejected</option>
                    </select>
                    </td>
                    <td><a type="submit" class="action-btn btn-blue" onclick=selectPart(${mainId}) >Submit</a></td>
                   
                  </tr>
      `
      incidentRecords.innerHTML += allRecords;
  
    })
} 
  
  
  function loadWindow() {
    const request = new Request(url, {
      headers: new Headers({
        'x-access-token': localStorage.jwtToken
      })
    });
    // The parameters we are gonna pass to the fetch function
    // document.getElementById('loading-v2').style.opacity = 0.7;
    document.getElementById('loading-data').innerHTML = `Loading...`

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then((data, index) => {
        const jwt = localStorage.jwtToken
        if (!jwt) {
          window.location.assign('login.html');
        }
        document.getElementById('loading-data').style.display = "none";
        const records = data.data;
        // if(data.status === 200 && records instanceof Array ){
        // }
        
        load(records)
        // if(data.error === 'No record found' && data.status === 400){
        //   document.getElementById('loading-v2').style.opacity = 0;
        // document.getElementById('loading-data').style.display = "block";

        //   document.getElementById('loading-data').innerHTML = `
        //    <h2 class="error-exp">Oops!</h2>
        //  <p class="err-msg">No record found!</p>
        //  <a href="dashboard.html" class="bt bt-blue bt-err" > return to dashboard</a>`
        // }
  
      })
      .catch(err => {
        console.log(err)
        // document.getElementById('loading').style.opacity = 0;
        // redflagsErr.style.opacity = 1;
        //  redflagsErr.innerHTML = `
        //    <h2 class="error-exp">Oops!!!</h2>
        //  <p class="err-msg">Connection failed! Kindly try again</p>
        //  <a href="view-redflags.html" class="bt bt-blue bt-err" >Try again</a>`
      });
  }


//   function getSelectedOption(sel) {
//     var opt;
//     for ( var i = 0, len = sel.options.length; i < len; i++ ) {
//         opt = sel.options[i];
//         if ( opt.selected === true ) {
//             break;
//         }
//     }
//     return opt;
//     }

  function selectPart(id){
    loadingNow(true)
        const e = document.getElementById('me');
        // var status = e.options[e.selectedIndex].value;
        const status = e.options[e.selectedIndex].text;

        console.log(status)
        // const statusValue = selectOpt.options[selectOpt.selectedIndex].value
        // console.log(statusValue)
        const url = `https://ireporter-full.herokuapp.com/api/v1/all-incidents/${id}/status`;
        const request = new Request(url, {
            method: 'PATCH',
            headers: new Headers({
              'x-access-token': localStorage.jwtToken,
              Accept: 'application/json, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({status})
          });
        fetch(request)
        .then(response => response.json())
        .then(data => {
          loadingNow(false)
          document.getElementById('mystatus').innerHTML = `<span style="color:steelblue">${status}</span>`;
            console.log(data);
        })
  }
window.addEventListener('load', loadWindow);


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
  