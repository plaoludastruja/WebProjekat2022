// naziv komponente kao u app.js
Vue.component("editService", { 
	// podaci
	data: function () {
	    return {
            editingServiceName: this.$route.params.serviceName,
            user: {},
            service: {},
            greska: "",
            trainers: [],
	    }
	},
	// html bootstrap
	    template: `
<div class="d-flex flex-column min-vh-100">

    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
            <div class="container px-5">
                <a class="navbar-brand" role="button" @click="openHome()">
                    <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                    BitiFiti - {{this.user.sportsObject}}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-1" role="button" @click="openMySportObject()">Moj sportski objekat</li>
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
                    <h1 class="masthead-heading mb-1">Dodaj Novi Trening</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <a @click="addServicePage()" class="btn btn-outline-dark rounded-pill" target="__blank">Dodaj trening</a>
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
                                                <h3 class="mb-3">Promjeni trening</h3>
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
                                                    <input v-model="service.price" type="number" class="form-control form-control-lg" />
                                                    <label class="form-label">Cijena</label>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input v-model="service.description" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Opis</label>
                                                </div>

                                                <div class="row mb-0">
                                                    <div class="col-md-8 mb-2">
                                                        <div class="form-outline mb-2">
                                                            <select class="form-select" v-model="service.trainer">
                                                                <option disabled>Nema trenera</option>
                                                                <option v-for="trainer in trainers" :value="trainer.username">{{trainer.firstName}} {{trainer.lastName}}</option>
                                                            </select>
                                                            <label class="form-label">Izaberite trenera</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input class="form-control" type="file" ref="image" accept="image/png, image/jpeg" id="formFile"><br>
                                                    <label class="form-label">Logo</label>
                                                </div>

                                                <div style="color: red;" id="greska">{{greska}}</div>
        
                                                <div class="d-flex justify-content-end pt-3">
                                                    <button @click="addNewService()" type="button" class="btn btn-warning btn-lg ms-2">Dodaj</button>
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
        this.getService();
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
        getService: function () {
			axios
			.get('rest/sportObject/service/' + this.editingServiceName)
			.then(response=> {this.service=response.data})
		},
        // TODO : treba da mi vrati sve trenere, mogu ciljati users,
        // a moze se napraviti i odvojeni za trenere
        // ugl ocekujem listu ttrenerea
        getTrainers: function () {
			axios
			.get('rest/users/trainers')
			.then(response=> {this.trainers=response.data})
		},
        openHome: function(){
            this.$router.push("/homeManager/" + this.user.username)
        },
        openMyProfilePage: function(){
            this.$router.push("/myProfile/" + this.user.username)
        },
        openMySportObject: function(){
            this.$router.push("/mySportObject/" + this.user.username + "/" + this.sportObjectName)
        },
        addServicePage: function(){
            this.$router.push("/addService/" + this.sportObjectName)
        },
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.user=response.data})
		},
        addNewService: function() {
            // TODO dodati sliku za logo
            this.service.image = "components/Resources/" + document.getElementById("formFile").files[0].name;
            this.service.sportObject = this.sportObjectName;
            
            // TODO saljem addNewService/"IME SPORTSKOG OBJEKTA", i saljem trening, u bekendu dodati servis u taj sportsko objekat
            axios
            .post('rest/sportObjects/addNewService/'+ this.sportObjectName, this.service)
            .then(this.$router.push("/mySportObject/" + this.user.username + "/" + this.sportObjectName))
            .catch(err => {this.greska = "Nesto ne valja!";})
        },
    }
});