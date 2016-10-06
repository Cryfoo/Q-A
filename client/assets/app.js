var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/index", {
		title: "Home",
		templateUrl: "partials/login.html",
		controller: "loginController"
	})
	.when("/", {
		title: "Home",
		templateUrl: "partials/home.html",
		controller: "indexController"
	})
	.when("/new_question", {
		title: "Add a Question",
		templateUrl: "partials/new_q.html",
		controller: "newQueController"
	})
	.when("/question/:id", {
		title: "Q&A",
		templateUrl: "partials/show.html",
		controller: "showController"
	})
	.when("/question/:id/new_answer", {
		title: "Answer the Question",
		templateUrl: "partials/new_a.html",
		controller: "newAnsController"
	})
	.otherwise({
		redirectTo: "/index"
	});
});

app.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}]);