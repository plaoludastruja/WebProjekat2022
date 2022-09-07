// naziv komponente kao u app.js
Vue.component("sportObjectInfoCustomer", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            sportObjectName: this.$route.params.name,
            sortedbyASC: true,
            nameSearch:'',
		    typeSearch:'',
            priceSearch: '',
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
                    <a class="navbar-brand" role="button" @click="openHome()">
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti - {{sportObjectName}}
                    </a>
                </div> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-1" role="button" @click="openSomethingForCustomer()">Moji stavec</li>
                        <li class="nav-item mx-1" role="button" @click="openMyProfilePage()">Moj profil</li>
                        <li class="nav-item mx-1" role="button" @click="logOut()">Odjavi se</li>
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
        </div>
    </header>

    <!-- pretraga -->
        <section class="bg-dark py-4">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <input class="col-lg-2 mx-2" type="text" v-model="nameSearch" placeholder="Naziv">
                    
                    <select class="btn btn-warning col-lg-2 mx-2 dropdown-toggle" v-model="typeSearch"
                        data-toggle="dropdown">
                        <option class="dropdown-item" value="">Sve vrste</option>
                        <option class="dropdown-item" value="PERSONAL_TRAINING">Personalni trening</option>
                        <option class="dropdown-item" value="GROUP_TRAINING">Grupni trening</option>
                        <option class="dropdown-item" value="SAUNA">Sauna</option>
                        <option class="dropdown-item" value="MASSAGE">Masaža</option>
                    </select>

                    <select class="btn btn-warning col-lg-2 mx-2 dropdown-toggle" v-model="priceSearch"
                        data-toggle="dropdown">
                        <option class="dropdown-item" value="">Sve cijene</option>
                        <option class="dropdown-item" value="0">Besplatan</option>
                        <option class="dropdown-item" value="1">< 500</option>
                        <option class="dropdown-item" value="2">500 - 1000</option>
                        <option class="dropdown-item" value="3">1000 - 2000</option>
                        <option class="dropdown-item" value="4">> 2000</option>
                    </select>

                    <div v-on:click="sortList('name')" type="button" class="btn btn-warning col-md-1 mx-2" data-bs-toggle="tooltip" title="Sortiraj po imenu">
                        <svg v-if="sortedbyASC" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sort-alpha-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                        </svg>
                    </div>

                    <div v-on:click="sortList('price')" type="button" class="btn btn-warning col-md-1 mx-2" data-bs-toggle="tooltip" title="Sortiraj po prosječnoj ocjeni">
                        <svg v-if="sortedbyASC" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                            <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                            <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                            <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sort-numeric-up" viewBox="0 0 16 16">
                            <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                            <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                            <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                        </svg>
                    </div>

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
                                    <div v-for="service in filteredServices" class="col-lg-4">
                                        <div class="card">
                                            <img v-bind:src="service.image" class="mx-auto" width="200"/>
                                            <div class="card-body">
                                                <h4 class="card-title">{{service.name}}</h4>
                                                <h6>{{service.ServiceType}}</h6>
                                                <h6>Trener<p>{{service.trainer}}<p></h6>
                                                <h6>Cijena<p>{{service.price}}<p></h6>
                                                <h6>Trajanje:<p>{{service.duration}}</p></h6>
                                                <h6>Tip:<p>{{service.serviceType}}</p></h6>
                                                <button @click="doTraining(service)" type="button" class="btn btn-outline-dark">Zakaži</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
            OVDE IDU KOMENTARI I OCJENE
            </setcion>

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
		filteredServices() {
            return this.sportObject.services.filter((service) => {
				    searchObject =  service.name.toLowerCase().match(this.nameSearch.toLowerCase()) &&
                                    service.serviceType.toLowerCase().match(this.typeSearch.toLowerCase()) &&
                                    (
                                    (this.priceSearch==0 && service.price == 0 ) ||
                                    (this.priceSearch==1 && service.price <= 500 ) ||
                                    (this.priceSearch==2 && (service.price > 500 && service.price <= 1000) ) ||
                                    (this.priceSearch==3 && (service.price > 1000 && service.price <= 2000) ) ||
                                    (this.priceSearch==4 && service.price > 2000 ) ||
                                    (this.priceSearch=='' && service.price >= 0 )
                                    );
				return searchObject;
			})
		},
	},
	// funkcije
    methods: {
        sortList(sortBy) {
			if (this.sortedbyASC) {
				this.sportObject.services.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
				this.sortedbyASC = false;
			} else {
				this.sportObject.services.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
				this.sortedbyASC = true;
			}
		},
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
        openHome: function(){
            this.$router.push("/homeCustomer/" + this.username)
        },
        openMyProfilePage: function(){
            this.$router.push("/myProfile/" + this.username)
        },
        openSomethingForCustomer: function(){
            this.$router.push("/customersFee/" + this.username)
        },
        doTraining: function (service) {
			axios
			.post('rest/users/' + service)
			.then(response=> {this.$router.push("/TODO")})
		},
    }
});