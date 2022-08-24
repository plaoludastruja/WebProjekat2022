// naziv komponente kao u app.js
Vue.component("homeManager", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            sortedbyASC: true,
            nameSearch:'',
		    typeSearch:'',
		    locationSearch:'',
		    scoreSearch:'',
            sportObjects: [],
            user:{},
	    }
	},
	// html bootstrap
	    template: ` 
<div>

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
                        <h1 class="masthead-heading mb-0">Pocetna za menazdera</h1>
                        <h2 class="masthead-subheading mb-0">Šala, ovo je smeće, ne znam da li će raditi išta</h2>
                        <a class="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">Learn More</a>
                    </div>
                </div>
            </header>

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
                                <div v-for="object in filteredSportObjects" class="col-lg-4">
                                    <div class="card">
                                        <img v-bind:src="object.logo" class="mx-auto" width="200"/>
                                        <div class="card-body">
                                            <h4 class="card-title">{{object.name}}</h4>
                                            <h6 v-if="object.working" style="color: green;">Otvoreno</h6>
                                            <h6 v-else style="color: red;">Zatvoreno</h6>
                                            <h6>{{object.location.city}}<p>{{object.location.streetName}} {{object.location.streetNumber}}</p></h6>
                                            <h6 >Ocjena: <svg xmlns="http://www.w3.org/2000/svg" v-for="p in object.averageScore" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg></h6>
                                            <button @click="openSportObjectPage(object.name)" type="button" class="btn btn-outline-dark">Pregledaj</button>
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
        this.getAllSportObject();
        this.getCurrentUser();
    },
    computed: {
        // ovo prepraviti da bude kao pretraga, sa svim ifovima u zavisnosti sta je ukucano
		filteredSportObjects() {
            return this.sportObjects.filter((sportsObject) => {
				searchObject =  sportsObject.name.toLowerCase().match(this.nameSearch.toLowerCase()) &&
                                sportsObject.sportObjectType.toLowerCase().match(this.typeSearch.toLowerCase()) &&
                                sportsObject.averageScore.toString().toLowerCase().match(this.scoreSearch.toLowerCase()) &&
                                (sportsObject.location.streetName.toLowerCase().match(this.locationSearch.toLowerCase()) || 
                                sportsObject.location.streetNumber.toString().toLowerCase().match(this.locationSearch.toLowerCase()) ||
                                sportsObject.location.city.toLowerCase().match(this.locationSearch.toLowerCase()) ||
                                sportsObject.location.zipCode.toString().toLowerCase().match(this.locationSearch.toLowerCase()));
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
        getAllSportObject: function () {
			axios
			.get('rest/sportObjects/')
			.then(response=> {this.sportObjects=response.data})
		},
        openMyProfilePage: function(){
            this.$router.push("/myProfile/" + this.username)
        },
        openMySportObject: function(){
            this.$router.push("/mySportObject/" + this.username + "/" + this.user.sportsObject)
        },
        openSportObjectPage: function(sportObjectName){
			this.$router.push("/sportObjectInfo/" + sportObjectName);
		},
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.user=response.data})
		},
    }
});