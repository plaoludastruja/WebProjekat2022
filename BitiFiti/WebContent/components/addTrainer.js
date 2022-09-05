// naziv komponente kao u app.js
Vue.component("addTrainer", { 
	// podaci
	data: function () {
	    return {
            users: [],
            user: {
				username: '',
                password: '',
                firstName: '',
                lastName: '',
                gender: null,
                dateOfBirth: '',
                userType: 2
		  	},
            greska: "",
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
                    <h1 class="masthead-heading mb-1">Novi trener</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <a @click="addSportObject()" class="btn btn-outline-dark rounded-pill" target="__blank">Dodaj sportski objekat</a>
                            <a @click="addManager()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj menadjera</a>
                            <a @click="addTrainer()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj trenera</a>
                            <a @click="addPromoCode()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj promo kod</a>
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
                                                <h3 class="mb-3">Dodaj novog trenera</h3>
                
                                                <div class="row mb-0">
                                                    <div class="col-md-6 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="user.firstName" type="text" class="form-control form-control-lg" />
                                                            <label class="form-label">Ime</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 mb-2">
                                                        <div class="form-outline">
                                                            <input v-model="user.lastName" type="text" class="form-control form-control-lg" />
                                                            <label class="form-label">Prezime</label>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div class="d-md-flex justify-content-start align-items-center mb-2 pb-2">
                                                    <h6 class="mb-0 me-4">Pol: </h6>
                                                    <div class="form-check form-check-inline mb-0 me-4">
                                                        <input v-model="user.gender" value="1" class="form-check-input" type="radio"/>
                                                        <label class="form-check-label">Žensko</label>
                                                    </div>
                                                    <div class="form-check form-check-inline mb-0 me-4">
                                                        <input v-model="user.gender" value="0" class="form-check-input" type="radio"/>
                                                        <label class="form-check-label">Muško</label>
                                                    </div>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="user.dateOfBirth" type="date" class="form-control form-control-lg" />
                                                    <label class="form-label">Datum rođenja</label>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="user.username" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Korisničko ime</label>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="user.password" type="password" class="form-control form-control-lg" />
                                                    <label class="form-label">Šifra</label>
                                                </div>
        
                                                <div style="color: red;" id="greska">{{greska}}</div>
        
                                                <div class="d-flex justify-content-end pt-3">
                                                    <button @click="registerUser()" type="button" class="btn btn-warning btn-lg ms-2">Registruj</button>
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
        addPromoCode: function(){
            this.$router.push("/addPromoCode")
        },
        registerUser: function() {
            axios
            .post('rest/users/register', this.user)
            .then(this.$router.push("/allUsers"))
            .catch(err => {
                this.greska = "Nesto ne valja!";
            })
        }
    }
});