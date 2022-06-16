// Ovde se dodaju ove vue komponente i ispod se pravi ruta do njih
const HomePage = {template: '<homepage></homepage>'}
const LoginPage = {template: '<login></login>'}
const RegisterPage = {template: '<register></register>'}

// ne prelaziti
const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', name: 'home', component: HomePage},
		{ path: '/login', component: LoginPage},
		{ path: '/register', component: RegisterPage}

		// ne prelaziti
	]
});

var app = new Vue({
	router,
	el: '#app'
});