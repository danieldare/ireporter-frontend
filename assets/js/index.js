const link = document.getElementById('links-container');

const jwtt = localStorage.getItem('jwtToken');
const loggedinLinks = document.getElementById('show-links');
console.log(jwtt)
if(jwtt){
    link.innerHTML = `
    <a href="dashboard.html" class="btn-sm btn-dark btn-mr">Dashboard</a
    >`;

    loggedinLinks.innerHTML = `
  <li><a href="dashboard.html">Dashboard</a></li>
  <li><a href="profile.html">Profile</a></li>
  <li><a href="#" id="logout">Logout</a></li>`

}

{/* <a href="view-all.incident.html" class="btn-sm btn-dark btn-mr">View All Records</a> */}