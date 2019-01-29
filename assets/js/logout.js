const jwtToken = localStorage.getItem('jwtToken');
const logOut = document.getElementById('logout');

if(jwtToken && logOut){
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('jwtToken');
        window.location.href = 'login.html'
    })
}

const urlM = document.location.href.split('/');
const urlDashboard = urlM.includes('dashboard.html')
const urlCreateRedflag = urlM.includes('create-redflag.html')
const urlCreateIntervention = urlM.includes('create-intervention.html')
const urlViewInterventions = urlM.includes('view-interventions.html')
const urlViewRedflags = urlM.includes('view-redflags.html')
const urlViewOneRedflag = urlM.includes('view-one-redflag.html')
const urlViewOneIntervention = urlM.includes('view-one-intervention.html')
const urlProfile = urlM.includes('profile.html')

if(!jwtToken && urlDashboard || !jwtToken && urlViewInterventions || !jwtToken && urlViewRedflags || !jwtToken && urlViewOneRedflag || !jwtToken && urlViewOneIntervention || !jwtToken && urlProfile || !jwtToken && urlCreateIntervention || !jwtToken && urlCreateRedflag){
  window.location.href = 'login.html';
}