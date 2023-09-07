const CLIENT_ID = "0d8279df26c4479fa288fb993fc0afce";
const REDIRECT_URI = "https://spotify-profile-app.netlify.app/validate";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "ugc-image-upload user-follow-read playlist-read-private user-top-read playlist-read-collaborative user-read-recently-played";

export { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE };

//"ugc-image-upload user-follow-read playlist-read-private user-top-read playlist-read-collaborative user-follow-read";
//"user-follow-read user-top-read playlist-read-private user-read-recently-played"