const env = process.env.NODE_ENV || 'development';
const vars = {
  development: {
    BASE_DOMAIN: 'l.realthub.com',
    API_URL: 'https://realthub-api.onrender.com',
    GOOGLE_MAPS_API_KEY: 'AIzaSyCx2_EqHzYNxnEf0kURZFbjxYbuF8jqbK0',
  },
  staging: {
    BASE_DOMAIN: 'realthub.com',
    API_URL: 'https://realthub-api.onrender.com',
    GOOGLE_MAPS_API_KEY: 'AIzaSyCx2_EqHzYNxnEf0kURZFbjxYbuF8jqbK0',
  },
  production: {
    BASE_DOMAIN: 'realthub.com',
    API_URL: 'https://realthub-api.onrender.com',
    GOOGLE_MAPS_API_KEY: 'AIzaSyCx2_EqHzYNxnEf0kURZFbjxYbuF8jqbK0',
  },
}[env];

const nextConfig = {
  env: vars,
};

module.exports = nextConfig;
