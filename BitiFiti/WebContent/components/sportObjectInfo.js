// naziv komponente kao u app.js
Vue.component("sportObjectInfo", { 
	// podaci
	data: function () {
	    return {
            sportObjectName: this.$route.params.name,
            sortedbyASC: true,
            nameSearch:'',
		    typeSearch:'',
		    locationSearch:'',
		    scoreSearch:'',
            users: [],
            sportObject:{},
            services:[],
	    }
	},
	// html bootstrap
	    template: ` 
<div>

    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
            <div class="container px-5">
                <div>
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#/">
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti - {{sportObjectName}}
                    </a>
                </div> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        
                        <li class="nav-item mx-1" role="button" @click="logOut()">Odjavi se</li>
                    </ul>
                </div>
            </div>
        </nav>

    <!-- pretraga -->
        <section class="bg-dark">
            <div class="container py-3">
                <div class="row d-flex justify-content-center">
                    <input class="col-lg-2 mx-2" type="text" v-model="nameSearch" placeholder="Naziv">
                    <input class="col-lg-2 mx-2" type="text" v-model="typeSearch" placeholder="Tip" >
                    <input class="col-lg-2 mx-2" type="text" v-model="locationSearch" placeholder="Lokacija" >
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
                                                <h4 class="card-title">{{service.name}}</h4>
                                                <h6>{{service.ServiceType}}</h6>
                                                <h6>Trener<p>{{service.trainer}}<p></h6>
                                                <h6>Cijena<p>{{service.trainer}}<p></h6>
                                                <h6>Trajanje: {{service.duration}}</h6>
                                                <button @click="editService(service.name)" type="button" class="btn btn-outline-dark">Izmijeni</button>
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
        this.getSportObject();
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
        getSportObject: function () {
			axios
			.get('rest/sportObjects/' + this.sportObjectName)
			.then(response=> {this.sportObject=response.data})
		},
    }
});