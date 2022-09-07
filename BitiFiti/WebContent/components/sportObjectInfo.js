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
<div class="d-flex flex-column min-vh-100">

    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
            <div class="container px-5">
                <div>
                    <a class="navbar-brand">
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti - {{sportObjectName}}
                    </a>
                </div> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                    </ul>
                </div>
            </div>
        </nav>

    <header>
        <div class="p-5 text-center bg-image" style="background-image: url('components/Resources/manager.png'); height: 400px;">
            <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img v-bind:src="sportObject.logo"  width="200" height="200">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div  class="col">
                            <h1 class="mb-3 text-white">{{sportObject.name}}</h1>
                            <h4 class="mb-3 text-white">{{sportObject.sportObjectType}}</h4>
                            <h6 class="mb-3 text-white">Ocjena:
                                <svg xmlns="http://www.w3.org/2000/svg" v-for="po in sportObject.averageScore" width="25" height="25" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                </svg>
                            </h6>

                            <button @click="showMap()" type="button" class="btn btn-warning active mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg> {{sportObject.location.streetNumber}} {{sportObject.location.streetName}} , {{sportObject.location.city}}
                            </button>
                    </div>
                </div>
            </div>
        </div>]
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
                                    <div v-for="service in this.sportObject.services" class="col-lg-4">
                                        <div class="card">
                                            <img v-bind:src="service.image" class="mx-auto" width="200"/>
                                            <div class="card-body">
                                                <h4 class="card-title">{{service.name}}</h4>
                                                <h6>{{service.ServiceType}}</h6>
                                                <h6>Trener<p>{{service.trainer}}<p></h6>
                                                <h6>Cijena<p>{{service.price}}<p></h6>
                                                <h6>Trajanje: {{service.duration}}</h6>
                                                <h6>Tip: {{service.serviceType}}</h6>
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
        // TODO da se otvori da se prikaze mapa
        showMap: function(){
			this.$router.push("/map/" + sportObjectName);
		},
    }
});