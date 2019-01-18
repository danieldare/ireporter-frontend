const edit = document.getElementById("edit");
const displayForm = document.querySelector(".edit-form");
const spinner = document.querySelector(".no-spinner");
// edit.addEventListener("click", editRecord);

// let loading = true;
// function editRecord(e) {
//   e.preventDefault();
//   //   scroll to the position
//   scrollWin();
//   // Add spinner class
//   if (loading === true) {
//     spinner.classList.add("show-spinner");
//   }
//   loading = falsessssssss;
//   setTimeout(() => {
//     if (loading === false) {
//       spinner.classList.remove("show-spinner");
//       displayForm.classList.add("edit-show-form");
//     }
//   }, 2000);
// }

// function scrollWin() {
//   window.scrollTo(0, 700);
// }




// const body = document.getElementById('body');

const url = 'http://localhost:5050/api/v1/red-flags';
const redflagsRecord = document.getElementById('display-redflag');
// const deleteBox = document.getElementById('delete-me'); 

//     deleteBox.addEventListener('click', () => {
//     console.log('Hello from here')
//   })



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
        <a href="edit-redflag.html" class="bt bt-blue">Edit</a>
        <a href="#delete-modal" class="bt bt-red">Delete</a>
      </div>
    </div>
    </a>

    <div class="delete-modal" id="delete-modal">
            <div class="delete-modal__content">
                <p class="delete-modal__text">Do you want to delete this record?</p>
                <small class="delete-modal__warning">warning! This cannot be reversed</small>
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
      data.data.forEach(data => console.log(data))
      const records = data.data;
      if(records.length !== 0){
        document.getElementById('loading').style.opacity = 0;
        load(data.data)
      }else{

      }

    })
    .catch(err => {
      return err;
    });
}

window.addEventListener('load', loadWindow);
