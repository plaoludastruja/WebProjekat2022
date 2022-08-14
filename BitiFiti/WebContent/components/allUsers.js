// naziv komponente kao u app.js
Vue.component("allUsers", { 
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
                        BitiFiti - Pregled svih korisnika
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="mx-5" @click="openAllUsersPage()" class="nav-item">Svi korisnici</li>
                            <li class="mx-5" @click="openMyProfilePage()" class="nav-item">Moj profil</li>
                            <li class="mx-5" @click="logOut()" class="nav-item">Odjavi se</li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Header-->
            <header class="masthead text-center text-black">
                <div class="masthead-content">
                    <div class="container px-5">
                        <h1 class="masthead-heading mb-0">SVI KORISNICI</h1>
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
                        <label v-on:click="sortList('name')">Korisnicko ime</label>
                        </th>
                        <th v-on:click="sortList('sportObjectType')">Sifra</th>
                    </tr>
                </thead>
                <tbody v-for="object in filteredUsers">
                    <tr>
                        <td>{{object.username}}</td>
                        <td>{{object.password}}</td>
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
        this.getAllUsers();
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
        // TODO1 saljem upit ali dobijam 500
        getAllUsers: function () {
			axios
			.get('rest/users/allUsers')
			.then(response=> {this.users=response.data})
		},
        openMyProfilePage: function(){
            this.$router.push("/myProfile/"+this.id)
        },
        openAllUsersPage: function(){
            this.$router.push("/allUsers")
        },
    }
});