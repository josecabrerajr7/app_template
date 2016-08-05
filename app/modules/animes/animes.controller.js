angular
	.module('app')
	.controller('AnimesController', AnimesController);

AnimesController.$inject = ['animeservice'];

function AnimesController(animeservice) {
	var vm = this;
	vm.animes = [];

	activate();

	function activate() {
		return getAnimes().then(function() {
			console.log('Activated Anime view');
		});
	}

	function getAnimes() {
		return animeservice.getAnimes()
			.then(function(data) {
				vm.animes = data;
				return vm.animes;
			});
	}
	
}