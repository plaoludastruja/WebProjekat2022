// Ovde se dodaju ove vue komponente i ispod se pravi ruta do njih
const HomePage = {template: '<homepage></homepage>'}
const LoginPage = {template: '<login></login>'}
const RegisterPage = {template: '<register></register>'}
const HomeCustomerPage = {template: '<homeCustomer></homeCustomer>'}
const HomeAdministratorPage = {template: '<homeAdministrator></homeAdministrator>'}
const HomeManagerPage = {template: '<homeManager></homeManager>'}
const HomeTrainerPage = {template: '<homeTrainer></homeTrainer>'}
const AllUsersPage = {template: '<allUsers></allUsers>'}
const MyProfilePage = {template: '<myProfile></myProfile>'}
const AddSportObjectPage = {template: '<addSportObject></addSportObject>'}
const AddManagerPage = {template: '<addManager></addManager>'}
const AddTrainerPage = {template: '<addTrainer></addTrainer>'}
const MySportObjectPage = {template: '<mySportObject></mySportObject>'}
const SportObjectInfoPage = {template: '<sportObjectInfo></sportObjectInfo>'}
const AddServicePage = {template: '<addService></addService>'}
const MyServicesPage = {template: '<myServices></myServices>'}

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
		{ path: '/homeTrainer/:username', component: HomeTrainerPage},
		{ path: '/allUsers', component: AllUsersPage},
		{ path: '/myProfile/:username', component: MyProfilePage},
		{ path: '/addSportObject', component: AddSportObjectPage},
		{ path: '/addManager', component: AddManagerPage},
		{ path: '/addTrainer', component: AddTrainerPage},
		{ path: '/mySportObject/:name/:sportObjectName', component: MySportObjectPage},
		{ path: '/sportObjectInfo/:name', component: SportObjectInfoPage},
		{ path: '/addService/:name', component: AddServicePage},
		{ path: '/myServices/:username', component: MyServicesPage},

		// ne prelaziti
	]
});

var app = new Vue({
	router,
	el: '#app'
});