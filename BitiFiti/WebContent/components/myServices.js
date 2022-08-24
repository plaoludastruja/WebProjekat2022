// naziv komponente kao u app.js
Vue.component("myServices", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            sortedbyASC: true,
            nameSearch:'',
		    typeSearch:'',
		    locationSearch:'',
		    scoreSearch:'',
            users: [],
            sportObject:{},
            services:[]
	    }
	},
	// html bootstrap
	    template: ` 
<div class="d-flex flex-column min-vh-100">

    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
            <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#">
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti - {{username}}
                    </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-1" role="button" @click="openMyServices()">Moji treninzi</li>
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
                    <h1 class="masthead-heading mb-1">Moji Treninzi, KAD BOSKO URADI BEKEND</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <a @click="addSomethingForTrainer()" class="btn btn-outline-dark rounded-pill" target="__blank">Trener moze otkazati personalni trening</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    <!-- pretraga -->
        <section class="bg-dark">
            <div class="container py-3">
                <div class="row d-flex justify-content-center">
                    <input class="col-lg-2 mx-2" type="text" v-model="nameSearch" placeholder="Naziv sportske ustanove">
                    <input class="col-lg-2 mx-2" type="text" v-model="typeSearch" placeholder="Naziv treninga" >
                    <input class="col-lg-2 mx-2" type="text" v-model="locationSearch" placeholder="Personalni/grupni" >
                    <input class="col-lg-2 mx-2" type="text" v-model="scoreSearch" placeholder="Ocjena">
                </div>
            </div>
        </section>


    <!-- Carousel wrapper -->
        <section id="carousel">
            <div
                id="carouselMultiItemExample"
                class="carousel slide carousel-dark text-center"
                data-mdb-ride="carousel">

                <!-- Inner -->
                <div class="carousel-inner py-4">
                    <!-- Single item -->
                    <div class="carousel-item active">
                        <div class="container">
                            <div class="row">
                                <div v-for="service in this.sportObject.services" class="col-lg-4">
                                    <div class="card">
                                        <img v-bind:src="service.image" class="mx-auto" width="200"/>
                                        <div class="card-body">
                                            <h3 class="card-title">{{service.sportObject}}</h3>
                                            <h4>{{service.name}}</h4>
                                            <h6>{{service.ServiceType}}</h6>
                                            <h6>Cijena<p>{{service.trainer}}<p></h6>
                                            <h6>Trajanje: {{service.duration}}</h6>
                                            <button @click="editService(service.name)" type="button" class="btn btn-outline-dark">Otkaži</button>
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
        this.getTrainersServices();
    },
    computed: {
        // ovo prepraviti da bude kao pretraga, sa svim ifovima u zavisnosti sta je ukucano
		filteredUsers() {
            return this.users.filter((user) => {
				    searchObject =  user.username.toLowerCase().match(this.nameSearch.toLowerCase());
				return searchObject;
			})
		},
	},
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        getTrainersServices: function () {
			axios
			.get('rest/user/trainersServics' + this.username)
			.then(response=> {this.services=response.data})
		},
        openMyProfilePage: function(){
            this.$router.push("/myProfile/" + this.username)
        },
        openMyServices: function(){
            this.$router.push("/myServices/" + this.username)
        },
        addServicePage: function(){
            this.$router.push("/addService/" + this.id1)
        },
        // TODO da ga otkaze ako je nesto nmp
        editService: function(serviceName){
            this.$router.push("/editService/" + serviceName)
        },
        addSomethingForTrainer: function(serviceName){
            this.$router.push("/editService/" + serviceName)
        },
    }
});