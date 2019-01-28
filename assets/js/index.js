const link = document.getElementById('links-container');

const jwt = localStorage.getItem('jwtToken');
console.log(jwt)
if(jwt){
    link.innerHTML = `<a href="view-all.incident.html" class="btn-sm btn-dark btn-mr">View All Records</a><a href="dashboard.html" class="btn-sm btn-light">Dashboard</a
    >`
}