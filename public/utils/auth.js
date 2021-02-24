// import decode from 'jwt-decode';
const decode = require('jwt-decode');
module.exports = {
// class AuthService {
  // signToken: function({ username, email, id }) {
  // getProfile() {
    getProfile: function() {
    return decode(this.getToken());
  },

  // loggedIn() {
    loggedIn: function(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  // isTokenExpired(token) {
    isTokenExpired: function(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  },

  // getToken() {
    getToken: function() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  },

  // login(idToken) {
    login: function(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  },

  // logout() {
    logout: function() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

// export default new AuthService();
