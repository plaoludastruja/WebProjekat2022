// naziv komponente kao u app.js
Vue.component("mySportObject", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            sportObjectName: this.$route.params.name,
            sortedbyASC: true,
            nameSearch:'',
		    priceSearch:'',
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
                <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#">
                    <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                    BitiFiti - {{sportObjectName}}
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
                <div class="container px-5 mb-1">
                    <h1 class="masthead-heading mb-0">Moj sportski objekat</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <a @click="addServicePage()" class="btn btn-outline-dark rounded-pill" target="__blank">Dodaj trening</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    <!-- pretraga -->
        <section class="bg-dark">
            <div class="container py-3">
                <div class="row d-flex justify-content-center">
                    <input class="col-lg-2 mx-2" type="text" v-model="nameSearch" placeholder="Naziv">
                    <input class="col-lg-2 mx-2" type="text" v-model="priceSearch" placeholder="Cijena opseg" >
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


        <!-- tabela -->
        <section id="scroll">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                <table class="table">
                <thead>
                    <tr>
                        <th>
                        <label v-on:click="sortList('name')">Naziv</label>
                        </th>
                        <th v-on:click="sortList('sportObjectType')">Tip treninga</th>
                        <th v-on:click="sortList('sportObjectType')">Tip korisnika</th>
                        <th v-on:click="sortList('sportObjectType')">Izmjeni</th>
                    </tr>
                </thead>
                <tbody v-for="service in this.sportObject.services">
                    <tr>
                        <td>{{service.name}}</td>
                        <td>{{service.serviceType}}</td>
                        <td>{{service.sportObject}}</td>
                        <td><div  class="btn btn-outline-dark rounded-pill" @click="editService(service.name)">Izmijeni</div></td>
                    </tr>
                </tbody>
            </table>
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
				    searchObject =  this.sportObject.services.name.toLowerCase().match(this.nameSearch.toLowerCase());
                    // TODO opsjeg cijena
                    //&& this.this.sportObject.services.price;
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
        openMyProfilePage: function(){
            this.$router.push("/myProfile/" + this.username)
        },
        openMySportObject: function(){
            this.$router.push("/mySportObject/" + this.username + "/" + this.sportObjectName)
        },
        addServicePage: function(){
            this.$router.push("/addService/" + this.sportObjectName)
        },
        editService: function(serviceName){
            this.$router.push("/editService/" + serviceName)
        },
    }
});