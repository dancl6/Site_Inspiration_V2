
// const decode = require('jwt-decode');
const secret = 'mysecretsshhhhh';
// const jwt = require('jsonwebtoken');
const expiration = '2h';
// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }
// module.exports = {
// class AuthService {
  // signToken: function({ username, email, id }) {
  // getProfile() {
  const  getProfile = function() {
    return decode(this.getToken());
  }

   const testConsole = function(idToken) {
      console.log("testing import")
      localStorage.setItem('testing', 'testingval');
      localStorage.setItem('id_token', idToken);
      // window.location.assign('/');
    }

  // loggedIn() {
   const  loggedIn = function(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // isTokenExpired(token) {
   const isTokenExpired = function(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // getToken() {
   const getToken = function() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  // login(idToken) {
   const login = function(idToken) {
    
      if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }

    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    // window.location.assign('/');
  }

  // logout() {
   const  logout = function() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    // window.location.assign('/');
  }
   const signToken = function({ username, email, id }) {
    const payload = { username, email, id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
  const  authMiddleware = function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }
  
    // if no token, return request object as is
    if (!token) {
      return req;
    }
  
    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
  
    // return updated request object
    return req;
  }
// }

// export default new AuthService();
