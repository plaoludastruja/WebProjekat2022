// naziv komponente kao u app.js
Vue.component("addSportObject", { 
	// podaci
	data: function () {
	    return {
            id: this.$route.params.username,
            users: [],
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
                        <h1 class="masthead-heading mb-0">SVI KORISNICI</h1>
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
                                                <h3 class="mb-3">Dodaj novi sportski objekat</h3>
                                                <div class="form-outline mb-2">
                                                    <input v-model="sportObject.name" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Ime</label>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <select class="form-select" v-model="sportObjectType">
                                                        <option value=GYM>Teretana</option>
                                                        <option value=POOL>Bazen</option>
                                                        <option value=SPORT_CENTER>Sportski centar</option>
                                                        <option value=DANCE_STUDIO>Plesni studio</option>
                                                    </select>
                                                    <label class="form-label">Tip sportskog objekta</label>
                                                </div>

                                                <div class="row mb-0">
                                                    <div class="col-md-4 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="sportObject.location.streetName" type="text" class="form-control form-control-lg" />
                                                            <label class="form-label">Ulica</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="sportObject.location.streetNumber" type="text" class="form-control form-control-lg" />
                                                            <label class="form-label">Broj</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="sportObject.location.city" type="text" class="form-control form-control-lg" />
                                                            <label class="form-label">Grad</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="sportObject.location.zipCode" type="text" class="form-control form-control-lg" />
                                                            <label class="form-label">ZipCode</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-0">
                                                    <div class="col-md-6 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="sportObject.location.longitude" type="number" class="form-control form-control-lg" />
                                                            <label class="form-label">Longitude</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="sportObject.location.latitude" type="number" class="form-control form-control-lg" />
                                                            <label class="form-label">Latitude</label>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="sportObject.startTime" type="time" class="form-control form-control-lg" />
                                                    <label class="form-label">Pocetak</label>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="sportObject.endTime" type="time" class="form-control form-control-lg" />
                                                    <label class="form-label">Kraj</label>
                                                </div>


                                                <div style="color: red;" id="greska">{{greska}}</div>
        
                                                <div class="d-flex justify-content-end pt-3">
                                                    <button @click="addNewSportObject()" type="button" class="btn btn-warning btn-lg ms-2">Registracija</button>
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
        this.getAllUsers();
    },
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        getAllUsers: function () {
			axios
			.get('rest/users/allUsers')
			.then(response=> {this.users=response.data})
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
        addNewSportObject: function() {
            axios
            .post('rest/sportObjects/addSportObject', this.sportObject)
            .then(this.$router.push("/allUsers"))
            .catch(err => {
                this.greska = "Nesto ne valja!";
            })
        }
    }
});