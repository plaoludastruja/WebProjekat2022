// Ovde se dodaju ove vue komponente i ispod se pravi ruta do njih
const HomePage = {template: '<homepage></homepage>'}
const LoginPage = {template: '<login></login>'}
const RegisterPage = {template: '<register></register>'}
const HomeCustomerPage = {template: '<homeCustomer></homeCustomer>'}
const HomeAdministratorPage = {template: '<homeAdministrator></homeAdministrator>'}
const HomeManagerPage = {template: '<homeManager></homeManager>'}
const HomeTrainerPage = {template: '<homeTrainer></homeTrainer>'}

// ne prelaziti
const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', name: 'home', component: HomePage},
		{ path: '/login', component: LoginPage},
		{ path: '/register', component: RegisterPage},
		{ path: '/homeCustomer/:username', component: HomeCustomerPage},
		{ path: '/homeAdministrator/:username', component: HomeAdministratorPage},
		{ path: '/homeManager/:username', component: HomeManagerPage},
		{ path: '/homeTrainer/:username', component: HomeTrainerPage}

		// ne prelaziti
	]
});

var app = new Vue({
	router,
	el: '#app'
});