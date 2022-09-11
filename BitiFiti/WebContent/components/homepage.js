// naziv komponente kao u app.js
Vue.component("homepage", { 
	// podaci
	data: function () {
	    return {
            sortedbyASC: true,
            nameSearch:'',
		    typeSearch:'',
		    locationSearch:'',
		    scoreSearch:'',
            sportObjects: [],
	    }
	},
	// html bootstrap
	    template: `
<div class="d-flex flex-column min-vh-100">

	<!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#/" >
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="http://localhost:8080/BitiFiti/#/register">Registracija</a></li>
                            <li class="nav-item"><a class="nav-link" href="http://localhost:8080/BitiFiti/#/login">Prijava</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

    <!-- pretraga -->
        <section class="bg-dark py-4">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <input class="col-lg-2 mx-2" type="text" v-model="nameSearch" placeholder="Naziv">
                    <input class="col-lg-2 mx-2" type="text" v-model="locationSearch" placeholder="Lokacija">
                    <input class="col-lg-2 mx-2" type="text" v-model="scoreSearch" placeholder="Ocjena">
                    
                    <select class="btn btn-warning col-lg-2 mx-2 dropdown-toggle" v-model="typeSearch"
                        data-toggle="dropdown">
                        <option class="dropdown-item" value="">Sve</option>
                        <option class="dropdown-item" value="GYM">Teretana</option>
                        <option class="dropdown-item" value="POOL">Bazen</option>
                        <option class="dropdown-item" value="SPORT_SCENTER">Sportski centar</option>
                        <option class="dropdown-item" value="DANCE_STUDIO">Plesni studio</option>
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

                    <div v-on:click="sortList('averageScore')" type="button" class="btn btn-warning col-md-1 mx-2" data-bs-toggle="tooltip" title="Sortiraj po prosječnoj ocjeni">
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
                                <div v-for="object in filteredSportObjects" class="col-lg-4">
                                    <div class="card">
                                        <img v-bind:src="object.logo" class="mx-auto" width="200" height="200"/>
                                        <div class="card-body">
                                            <h4 class="card-title">{{object.name}}</h4>
                                            <h6 v-if="object.working" style="color: green;">Otvoreno</h6>
                                            <h6 v-else style="color: red;">Zatvoreno</h6>
                                            <h6><p>{{object.startTime}} - {{object.endTime}}</p></h6>
                                            <h6>{{object.sportObjectType}}</h6>
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
            <footer class="py-5 bg-black mt-auto">
                <div class="container px-5"><p class="m-0 text-center text-white small">Copyright &copy; Đorđe & Boško doo</p></div>
            </footer>
</div>`,
	// na pocetku
    mounted () {
        this.getAllSportObject();
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
    	getAllSportObject: function () {
			axios
			.get('rest/sportObjects/')
			.then(response=> {this.sportObjects=response.data})
		},
        sortList(sortBy) {
			if (this.sortedbyASC) {
				this.sportObjects.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
				this.sortedbyASC = false;
			} else {
				this.sportObjects.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
				this.sortedbyASC = true;
			}
		},
        openSportObjectPage: function(sportObjectName){
			this.$router.push("/sportObjectInfo/"+sportObjectName);
		},
    }
});