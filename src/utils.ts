//Format the Date to String
function formatDate(date:Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    
    return( new Date(date).toLocaleDateString(undefined, options));
  }

//Login Logout check
function hideLoginCTA() {
  const token = sessionStorage.getItem('token');
  const loginCTA = document.getElementById('login-cta');
  if (token && loginCTA) {
    loginCTA.style.display = 'none';
  }
  
}
  export {formatDate, hideLoginCTA} ;