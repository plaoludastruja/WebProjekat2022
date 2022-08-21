// naziv komponente kao u app.js
Vue.component("myServices", { 
	// podaci
	data: function () {
	    return {
            id: this.$route.params.username,
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
<div>

	<!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#">
                        <img src="" alt="" width="30" height="24" class="d-inline-block align-text-top">
                        BitiFiti - Moji treninzi
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="mx-5" @click="openHomepage()" class="nav-item">Pocetna</li>
                        </ul>
                        <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#">Pocetna</a>
                    </div>
                </div>
            </nav>

    <!-- Header-->
        <header class="masthead text-center text-black">
            <div class="masthead-content">
                <div class="container px-5">
                    <h1 class="masthead-heading mb-0">MOJI TRENINZI, KAD BOSKO URADI BEKEND</h1>
                    <div class="row">
                        <div class="col-sm-12">
                            <a @click="addServicePage()" class="btn btn-outline-dark rounded-pill" target="__blank">Trener moze otkazati personalni trening</a>
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
                        <label v-on:click="sortList('name')">Korisnicko ime</label>
                        </th>
                        <th v-on:click="sortList('sportObjectType')">Tip</th>
                        <th v-on:click="sortList('sportObjectType')">Sportski objekat</th>
                        <th v-on:click="sortList('sportObjectType')">Obrisi personalni</th>
                    </tr>
                </thead>
                <tbody v-for="service in this.services">
                    <tr>
                        <td>{{service.name}}</td>
                        <td>{{service.serviceType}}</td>
                        <td>{{service.sportObject.name}}</td>
                        <td><div  class="btn btn-outline-dark rounded-pill" @click="editService(service.name)">ne treba, mozda</div></td>
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
			.get('rest/user/'+this.id)
			.then(response=> {this.services=response.data})
		},
        openMyProfilePage: function(){
            this.$router.push("/myProfile/"+this.id)
        },
        openAllUsersPage: function(){
            this.$router.push("/allUsers")
        },
        addSportObject: function(){
            this.$router.push("/addService")
        },
        addManager: function(){
            this.$router.push("/addManager")
        },
        addTrainer: function(){
            this.$router.push("/addTrainer")
        },
        addServicePage: function(){
            this.$router.push("/addService/" + this.id1)
        },
        editService: function(serviceName){
            this.$router.push("/editService/" + serviceName)
        },
    }
});