angular.module('app', [
	'ui.router',
	'ngFileUpload',
	'ngMessages'
	])
	.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider)	{
	// if can't access a page it will go to the default page
	$urlRouterProvider.otherwise('animes');

	$stateProvider
		.state('animes', {
			url: '/home',
			templateUrl: 'public/views/animes/animes.html',
			controller: 'AnimesController',
			controllerAs: 'animeCtrl'
		})
		.state('create', {
			url: '/create',
			templateUrl: 'public/views/anime/animeCreate.html'
		});  	
}