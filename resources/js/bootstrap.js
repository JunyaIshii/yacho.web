import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// import axios from 'axios';
// window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.axios.defaults.withCredentials = true;

// import axios from 'axios';

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;

// // Get the CSRF token from the cookie
// const csrfToken = document.cookie
//   .split(";")
//   .map((cookie) => cookie.trim().split("="))
//   .find(([name]) => name === "XSRF-TOKEN")?.[1];

// // Set the CSRF token for axios
// axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

