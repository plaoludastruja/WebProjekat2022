// naziv komponente kao u app.js
Vue.component("addSportObject", { 
	// podaci
	data: function () {
	    return {
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
                manager: '',
                working: true,
            },
            greska: "",
            managers: [],
            file: null,
	    }
	},
	// html bootstrap
	    template: `
<div class="d-flex flex-column min-vh-100">

    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
            <div class="container px-5">
                <div>
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#/homeAdministrator/a">
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti
                    </a>
                </div> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-1" role="button" @click="openAllUsersPage()">Svi korisnici</li>
                        <li class="nav-item mx-1" role="button" @click="openMyProfilePage()">Moj profil</li>
                        <li class="nav-item mx-1" role="button" @click="logOut()">Odjavi se</li>
                    </ul>
                </div>
            </div>
        </nav>

    <!-- Header-->
        <header class="masthead text-center text-black">
            <div class="masthead-content">
                <div class="container px-5">
                    <h1 class="masthead-heading mb-1">Novi Sportski Objekat</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
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

                                                <div class="row mb-0">
                                                    <div class="col-md-8 mb-2">
                                                        <div class="form-outline mb-2">
                                                            <select class="form-select" v-model="sportObject.manager">
                                                                <option disabled>Nema mendjera</option>
                                                                <option v-for="manager in managers" :value="manager.username">{{manager.firstName}} {{manager.lastName}}</option>
                                                            </select>
                                                            <label class="form-label">Izaberite menadjera</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 mb-2">
                                                        <div @click="addManager()" type="button" class="btn btn-secondary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                            </svg>
                                                        </div>
                                                        <label class="form-label">Dodaj menadjera</label>
                                                    </div>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input class="form-control" type="file" ref="image" accept="image/png, image/jpeg" id="formFile"><br>
                                                    <label class="form-label">Logo</label>
                                                </div>

                                                

                                                <div style="color: red;" id="greska">{{greska}}</div>
        
                                                <div class="d-flex justify-content-end pt-3">
                                                    <button @click="addNewSportObject()" type="button" class="btn btn-warning btn-lg ms-2">Dodaj</button>
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
            <footer class="py-5 bg-black mt-auto">
                <div class="container px-5"><p class="m-0 text-center text-white small">Copyright &copy; Đorđe & Boško doo</p></div>
            </footer>
</div>`,
	// na pocetku
    mounted () {
        this.getFreeManagers();
        
    },
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        // TODO : treba da mi vrati sve menadzere koji nemaju sportski objekat, mogu ciljati users,
        // a moze se napraviti i odvojeni za menazdere
        // ugl ocekujem listu menadzera
        getFreeManagers: function () {
			axios
			.get('rest/users/freeManagers')
			.then(response=> {this.managers=response.data})
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
            // TODO dodati sliku za logo
            //this.sportObject.logo= "components/Resources/" + document.getElementById("formFile").files[0].name;
			this.sportObject.logo= "components/Resources/muscle.png"
            axios
            .post('rest/sportObjects/addSportObject', this.sportObject)
            .then(
                axios
                .put('rest/users/addSportObjectToManager', this.sportObject)
                .then(this.$router.push("/allUsers"))
                .catch(err => {
                    this.greska = "Druga greska!";
                })
            )
            .catch(err => {
                this.greska = "Postoji objekat sa tim imenom!";
            })
        },
    }
});