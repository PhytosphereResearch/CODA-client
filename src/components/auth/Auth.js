import auth0 from 'auth0-js';
import autobind from 'react-autobind';

const redirectUri = process.env.NODE_ENV === 'production' ? 'https://coda.phytosphere.com/callback' : 'https://localhost:8080/callback';

export default class Auth {
  constructor() {
    autobind(this);
  }

  userProfile;

  auth0 = new auth0.WebAuth({
    domain: 'phytosphere.auth0.com',
    clientID: 'R22kc94DJVwNp2HF3u5vfqkPLvelcEoy',
    redirectUri,
    audience: 'https://auth.coda.phytosphere.com',
    responseType: 'token id_token',
    scope: 'openid',
  });

  handleAuthentication() {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        window.location.replace('/');
      } else if (err) {
        window.location.replace('/');
        console.warn(`Error: ${err.error}. Check the console for further details.`);
        console.warn(err);
      }
    });
  }

  setSession(authResult) {
    const scopes = authResult.scope || this.requestedScopes || '';
    localStorage.setItem('scopes', JSON.stringify(scopes));
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  login() {
    this.auth0.authorize();
  }


  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location.replace('/');
  }
}
