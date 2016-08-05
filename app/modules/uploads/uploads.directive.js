angular
	.module('app')
	.directive('uploadDirective', uploadDirective);

function uploadDirective() {

	function link(scope, element, attrs) {
		console.log(element);
	}

	return {
		restrict: 'A',
		link: link
	};
}