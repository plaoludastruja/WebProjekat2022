// naziv komponente kao u app.js
Vue.component("allUsers", { 
	// podaci
	data: function () {
	    return {
            sortedbyASC: true,
            nameSearch:'',
		    surnameSearch:'',
		    usernameSearch:'',
            typeSearch: '',
            customerSearch: '',
            users: [],
            user: {},
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
                        BitiFiti
                    </a>
                </div> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-1" role="button" @click="openAllUsersPage()">Svi korisnici</li>
                        <li class="nav-item mx-1" role="button" @click="openComments()">Komentari</li>
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
                    <h1 class="masthead-heading mb-1">Svi korisnici</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <a @click="addSportObject()" class="btn btn-outline-dark rounded-pill" target="__blank">Dodaj sportski objekat</a>
                            <a @click="addManager()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj menadžera</a>
                            <a @click="addTrainer()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj trenera</a>
                            <a @click="addPromoCode()" class="btn btn-outline-dark rounded-pill" target="__blank" >Dodaj promo kod</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    <!-- pretraga -->
        <section class="bg-dark py-4">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <input class="col-lg-2 mx-2" type="text" v-model="nameSearch" placeholder="Ime">
                    <input class="col-lg-2 mx-2" type="text" v-model="surnameSearch" placeholder="Prezime" >
                    <input class="col-lg-2 mx-2" type="text" v-model="usernameSearch" placeholder="Korisničko ime">

                    <select class="btn btn-warning col-lg-2 mx-2 dropdown-toggle" v-model="typeSearch"
                        data-toggle="dropdown">
                        <option class="dropdown-item" value="">Sve</option>
                        <option class="dropdown-item" value="ADMINISTRATOR">Administrator</option>
                        <option class="dropdown-item" value="MANAGER">Menadžer</option>
                        <option class="dropdown-item" value="TRAINER">Trener</option>
                        <option class="dropdown-item" value="CUSTOMER">Kupac</option>
                    </select>

                    <select class="btn btn-warning col-lg-2 mx-2 dropdown-toggle" v-model="customerSearch"
                        data-toggle="dropdown">
                        <option class="dropdown-item" value="">Sve</option>
                        <option class="dropdown-item" value="">Zlatni</option>
                        <option class="dropdown-item" value="">Srebreni</option>
                        <option class="dropdown-item" value="">Bronzani</option>
                        <option class="dropdown-item" value="">NE RADI JOS</option>
                    </select>
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
                                <th v-on:click="sortList('username')">Korisničko ime</th>
                                <th v-on:click="sortList('password')">Šifra</th>
                                <th v-on:click="sortList('firstName')">Ime</th>
                                <th v-on:click="sortList('lastName')">Prezime</th>
                                <th v-on:click="sortList('userType')">Tip korisnika</th>
                                <th v-on:click="sortList('points')">Broj sakupljenih bodova</th>
                            </tr>
                        </thead>
                        <tbody v-for="user in filteredUsers">
                            <tr>
                                <td>{{user.username}}</td>
                                <td>{{user.password}}</td>
                                <td>{{user.firstName}}</td>
                                <td>{{user.lastName}}</td>
                                <td>{{user.userType}}</td>
                                <td>{{user.points}}</td>
                            </tr>
                        </tbody>
                    </table>
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
        this.getAllUsers();
        this.getCurrentUser();
    },
    computed: {
        // ovo prepraviti da bude kao pretraga, sa svim ifovima u zavisnosti sta je ukucano
		filteredUsers() {
            return this.users.filter((user) => {
				    searchObject =  user.firstName.toLowerCase().match(this.nameSearch.toLowerCase()) &&
                                    user.lastName.toLowerCase().match(this.surnameSearch.toLowerCase()) &&
                                    user.username.toLowerCase().match(this.usernameSearch.toLowerCase()) &&
                                    user.userType.toLowerCase().match(this.typeSearch.toLowerCase());
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
        getAllUsers: function () {
			axios
			.get('rest/users/allUsers')
			.then(response=> {this.users=response.data})
		},
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.user=response.data})
		},
        sortList(sortBy) {
			if (this.sortedbyASC) {
				this.users.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
				this.sortedbyASC = false;
			} else {
				this.users.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
				this.sortedbyASC = true;
			}
		},
        openHome: function(){
            this.$router.push("/homeAdministrator/" + this.user.username)
        },
        openMyProfilePage: function(){
            this.$router.push("/myProfile/"+this.user.username)
        },
        openAllUsersPage: function(){
            this.$router.push("/allUsers")
        },
        openComments: function(){
            this.$router.push("/allComments")
        },
        addSportObject: function(){
            this.$router.push("/addSportObject")
        },
        addManager: function(){
            this.$router.push("/addManager")
        },
        addTrainer: function(){
            this.$router.push("/addTrainer")
        },
        addPromoCode: function(){
            this.$router.push("/addPromoCode")
        },
    }
});