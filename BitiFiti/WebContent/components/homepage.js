// naziv komponente kao u app.js
Vue.component("homepage", { 
	// podaci
	data: function () {
	    return {
            sortedbyASC: true,
            search: '',
            nameSearch:'',
		    typeSearch:'',
		    locationSearch:'',
		    scoreSearch:'',
            sportObjects: [],
	    }
	},
	// html bootstrap
	    template: ` 
<div>

	<!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#">
                        <img src="" alt="" width="30" height="24" class="d-inline-block align-text-top">
                        BitiFiti
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="http://localhost:8080/BitiFiti/#/register">Sign Up</a></li>
                            <li class="nav-item"><a class="nav-link" href="http://localhost:8080/BitiFiti/#/login">Log In</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

    <!-- Header-->
            <header class="masthead text-center text-black">
                <div class="masthead-content">
                    <div class="container px-5">
                        <h1 class="masthead-heading mb-0">Najbolji sajt na svijetu</h1>
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
                        <th v-on:click="sortList('sportObjectType')">Tip</th>
                        <th v-on:click="sortList('location')">Lokacija</th>
                        <th v-on:click="sortList('averageScore')">Prosječna ocjena</th>
                    </tr>
                </thead>
                <tbody v-for="object in filteredSportObjects">
                    <tr>
                        <td>{{object.name}}</td>
                        <td>{{object.sportObjectType}}</td>
                        <td>{{object.location.city}}</td>
                        <td>{{object.averageScore}}</td>
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
    }
});