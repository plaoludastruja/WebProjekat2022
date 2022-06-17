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
		    gradeSearch:'',
            sportObjects: [],
	        sportObjects1:[
                {
                    name: 'dsa',
                    objectType: dsa,
                    items: [],
                    status: null,
                    location: {
                        longitude: 'dsa',
                        latitude: 'das',
                        address:
                            {
                            street: 'das',
                            number: 'das',
                            town: 'dsa',
                            zipCode: 'dsa'
                            },
                    },
                    averageGrade: 10,
                }
            ],
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
            <div class="container py-5">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-3 mb-4">
                        <input type="text" v-model="nameSearch" placeholder="Naziv">
                    </div>
                    <div class="col-lg-3 mb-4">
                        <input type="text" v-model="typeSearch" placeholder="Tip" >
                    </div>
                    <div class="col-lg-3 mb-4">
                        <input type="text" v-model="locationSearch" placeholder="Lokacija" >
                    </div>
                    <div class="col-lg-3 mb-4">
                        <input type="text" v-model="gradeSearch" placeholder="Ocjena">
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
                        <th>Tip</th>
                        <th v-on:click="sortList('location.address.town')">Lokacija</th>
                        <th v-on:click="sortList('averageGrade')">Prosječna ocjena</th>
                    </tr>
                </thead>
                <tbody v-for="object in filteredSportObjects">
                    <tr>
                        <td>{{object.name}}</td>
                        <td>{{object.objectType}}</td>
                        <td>{{object.location.address.town}}</td>
                        <td>{{object.averageGrade}}</td>
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
			if (!this.sportObjects) return null;
			return this.sportObjects.filter(letPom => {
				return letPom.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
			})
		},

	},
	// funkcije
    methods: {
    	getAllSportObject: function () {
			axios
			.get('/BitiFiti/rest/sportObjects/findAllSportObjects')
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