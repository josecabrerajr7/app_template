angular
	.module('app')
	.service('animeservice', animeservice);

animeservice.$inject = ['$http'];

function animeservice($http) {
	return {
		getAnimes: getAnimes
	};

	function getAnimes() {
		return $http.get('/api/animes')
			.then(getAnimesComplete)
			.catch(getAnimesFailed);

		function getAnimesComplete(response) {
			return response.data;
		}

		function getAnimesFailed(error) {
			console.log('XHR Failed for getAnimes.' + error.data);
		}
	}
}