// naziv komponente kao u app.js
Vue.component("addPromoCode", { 
	// podaci
	data: function () {
	    return {
            currentUser: {},
            promoCode: {
				name: '',
                expirationDate: '',
                usageNumber: 0,
                percent: 0
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
                    <a class="navbar-brand" role="button" @click="openHome()">
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
                    <h1 class="masthead-heading mb-1">Novi promo kod</h1>
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
                                                <h3 class="mb-3">Dodaj novi promo kod</h3>
                
                                                <div class="form-outline">
                                                    <input v-model="promoCode.name" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Kod</label>
                                                </div>
                
                                                <div class="form-outline mb-2">
                                                    <input v-model="promoCode.expirationDate" type="date" class="form-control form-control-lg" />
                                                    <label class="form-label">Datum isteka</label>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input v-model="promoCode.usageNumber" type="number" min="1" class="form-control form-control-lg" />
                                                    <label class="form-label">Trajanje</label>
                                                </div>

                                                <div class="form-outline mb-2">
                                                    <input v-model="promoCode.percent" type="number" min="1" max="100" class="form-control form-control-lg" />
                                                    <label class="form-label">Popust</label>
                                                </div>
        
                                                <div style="color: red;" id="greska">{{greska}}</div>
        
                                                <div class="d-flex justify-content-end pt-3">
                                                    <button @click="registerPromoCode()" type="button" class="btn btn-warning btn-lg ms-2">Dodaj</button>
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
        this.getCurrentUser();
    },
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.currentUser=response.data})
		},
        openHome: function(){
            this.$router.push("/homeAdministrator/" + this.currentUser.username)
        },
        openMyProfilePage: function(){
            this.$router.push("/myProfile/"+ this.currentUser.username)
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
        registerPromoCode: function() {
            axios
            .post('rest/promoCode/addPromoCode', this.promoCode)
            .then(this.$router.push("/allUsers"))
            .catch(err => {
                this.greska = "Nesto ne valja!";
            })
        }
    }
});