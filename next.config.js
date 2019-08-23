const withOffline = require('next-offline');

const env = process.env.NODE_ENV || 'development';
const vars = {
	development: {
		API_URL: 'http://localhost:3111/api',
		GOOGLE_MAPS_API_KEY: 'AIzaSyCx2_EqHzYNxnEf0kURZFbjxYbuF8jqbK0',
	},
	staging: {
		API_URL: 'https://realthub.com/api',
		GOOGLE_MAPS_API_KEY: 'AIzaSyCx2_EqHzYNxnEf0kURZFbjxYbuF8jqbK0',
	},
	production: {
		API_URL: 'https://realthub.com/api',
		GOOGLE_MAPS_API_KEY: 'AIzaSyCx2_EqHzYNxnEf0kURZFbjxYbuF8jqbK0',
	},
}[env];

const nextConfig = {
	target: 'serverless',
	registerSwPrefix: '/static',
	env: vars,
};

module.exports = withOffline(nextConfig);
