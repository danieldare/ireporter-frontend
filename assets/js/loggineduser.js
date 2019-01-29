const parseJwt = (token) => {
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
  

const userNameDom = document.getElementById('username');
const token = localStorage.getItem('jwtToken');
const jwtDecoded = parseJwt(token);
const loggedinLinks = document.getElementById('show-links');
if (jwtDecoded) {
  
    const { username, email } = jwtDecoded;
    userNameDom.innerText = `Welcome, ${email}`;

  loggedinLinks.innerHTML = `
  <li><a href="dashboard.html">Dashboard</a></li>
  <li><a href="profile.html">Profile</a></li>
  <li><a href="#" id="logout">Logout</a></li>`;
}

if (!jwtDecoded) {
loggedinLinks.innerHTML = `
<li><a href="dashboard.html">Login</a></li>
<li><a href="profile.html">Register</a></li>
`

}

