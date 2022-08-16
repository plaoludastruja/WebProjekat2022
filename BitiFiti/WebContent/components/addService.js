// naziv komponente kao u app.js
Vue.component("addService", { 
	// podaci
	data: function () {
	    return {
            id: this.$route.params.name,
            users: [],
            service: 
                {
                    name: '',
                    serviceType: 0,
                    sportObject: {},
                    duration: 0,
                    trainer: '',
                    description: '',
                    image: ''
                },

            sportObject: {
                name: '',
                sportObjectType: 0,
                services: [],
                location: {
                    longitude: 420.0,
                    latitude: 69.0,
                    streetName: '',
                    streetNumber: '',
                    city: '',
                    zipCode:'' 
                },
                logo: null,
                averageScore: 0.0,
                startTime: null,
                endTime: null,
                working: true,
            },
            greska: "",
            trainers: [],
            file: null,
	    }
	},
	// html bootstrap
	    template: `
<div>

	<!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#">
                        <img src="" alt="" width="30" height="24" class="d-inline-block align-text-top">
                        BitiFiti - {{id}}
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item" @click="openAllUsersPage()" class="nav-item">Svi korisnici</li>
                            <li class="nav-item" @click="openMyProfilePage()" class="nav-item">Moj profil</li>
                            <li class="nav-item" @click="logOut()" class="nav-item">Odjavi se</li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Header-->
            <header class="masthead text-center text-black">
                <div class="masthead-content">
                    <div class="container px-5">
                        <h1 class="masthead-heading mb-0">Moj sportski objekat</h1>
                        <div class="row">
                            <div class="col-sm-12">
                                <a @click="addSportObject()" class="btn btn-outline-dark rounded-pill" target="__blank">Dodaj sportski objekat</a>
                                <a @click="addManager()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj menadjera</a>
                                <a @click="addTrainer()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj trenera</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

    <!-- Dodavanje -->
    <section class="h-100 bg-dark">
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col col-xl-6">
                                <div class="card card-registration my-2">
                                    <div class="row g-0">
                                        <div class="d-flex align-items-center">
                                            <div class="card-body p-md-5 text-black">
                                                <h3 class="mb-3">Dodaj novi trening</h3>
                                                <div class="form-outline mb-2">
                                                    <input v-model="service.name" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Ime</label>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <select class="form-select" v-model="service.serviceType">
                                                        <option value=PERSONAL_TRAINING>Personalni trening</option>
                                                        <option value=GROUP_TRAINING>Grupni trening</option>
                                                        <option value=SAUNA>Sauna</option>
                                                        <option value=MASSAGE>Masaza</option>
                                                    </select>
                                                    <label class="form-label">Tip treninga</label>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="service.duration" type="number" class="form-control form-control-lg" />
                                                    <label class="form-label">Trajanje</label>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input v-model="service.description" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Opis</label>
                                                </div>

                                                <div class="row mb-0">
                                                    <div class="col-md-8 mb-2">
                                                        <div class="form-outline mb-2">
                                                            // TODO trainerValue je string, username od trenera, al to kad ga dobijem 
                                                            <select class="form-select" v-model="trainerValue">
                                                                <option disabled>Nema trenera</option>
                                                                <option v-for="trainer in trainers" :value="trainer.username">{{trainer.firstName}} {{trainer.lastName}}</option>
                                                            </select>
                                                            <label class="form-label">Izaberite trenera</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 mb-2">
                                                        <div class="btn btn-secondary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                            </svg>
                                                        </div>
                                                        <label class="form-label">Dodaj trenera</label>
                                                    </div>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input class="form-control" type="file" ref="image" accept="image/png, image/jpeg" id="formFile"><br>
                                                    <label class="form-label">Logo</label>
                                                </div>

                                                <div style="color: red;" id="greska">{{greska}}</div>
        
                                                <div class="d-flex justify-content-end pt-3">
                                                    <button @click="addNewService()" type="button" class="btn btn-warning btn-lg ms-2">Registracija</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

    <!-- Footer-->
            <footer class="py-5 bg-black">
                <div class="container px-5"><p class="m-0 text-center text-white small">Copyright &copy; Đorđe & Boško doo</p></div>
            </footer>
</div>`,
	// na pocetku
    mounted () {
        this.getTrainers();
        this.getCurrentUser();
        
    },
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        // TODO : treba da mi vrati sve trenere, mogu ciljati users,
        // a moze se napraviti i odvojeni za trenere
        // ugl ocekujem listu ttrenerea
        getTrainers: function () {
			axios
			.get('rest/users/trainers')
			.then(response=> {this.trainers=response.data})
		},
        openMyProfilePage: function(){
            this.$router.push("/myProfile/"+this.id)
        },
        openAllUsersPage: function(){
            this.$router.push("/allUsers")
        },
        addSportObject: function(){
            this.$router.push("/addSportObject")
        },
        addManager: function(){
            this.$router.push("/addManager")
        },
        addTrainer: function(){
            this.$router.push("/addTrainer")
        },
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.user=response.data})
		},
        addNewService: function() {
            // TODO dodati sliku za logo
            this.service.logo= document.getElementById("formFile").files[0].name;

            // TODO saljem addNewService/"IME SPORTSKOG OBJEKTA", i saljem trening, u bekendu dodati servis u taj sportsko objekat
            axios
            .post('rest/sportObjects/addNewService/'+ this.id, this.service)
            .then(this.$router.push("/mySportObject/" + this.user.username + "/" + this.this.id))
            .catch(err => {
                this.greska = "Nesto ne valja!";
            })
        },
    }
});