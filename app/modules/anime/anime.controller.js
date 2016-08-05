angular
	.module('app')
	.controller('AnimeController', AnimeController);

/**
 * added $http and $location provider
 * 
 */
AnimeController.$inject = ['$http', '$location', 'Upload'];

function AnimeController($http, $location, Upload) {
	var vm = this;

	/**
	 * submit form user input then redirect to home page
	 * 
	 */
	vm.submit = function submit() {
		var form = vm.form;

		var image = vm.fileUpload;
		return vm.upload(vm.file),
		
			$http.post('/api/animes', form)
				.success(function(data) {
					vm.form = {};
					vm.animes = data;
					$location.path('/home');
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		vm.upload = function upload(file) {
			Upload.upload({
				url: '/api/animes',
				data: {file: file}
			}).then(function (res) {
				console.log('success');
			});
		};

}
