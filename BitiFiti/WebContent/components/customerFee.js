// naziv komponente kao u app.js
Vue.component("customerFee", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            fees: [],
            takenFee: {
                name: '',
                numberOfTrainings: 0,
                numberOfDays: 0,
                price: 0.0,
                startDate: '',
                endDate: '',
                status: '',
                trainingsUsed: 0
            },
            promo: '',
            promoCode: {
                name: '',
                expirationDate: '',
                usageNumber: 0,
                percent: 0
            }
	    }
	},
	// html bootstrap
	    template: ` 
<div class="d-flex flex-column min-vh-100">

    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
            <div class="container px-5">
                    <a class="navbar-brand" role="button" @click="openHome()">
                        <img src="components/Resources/muscle.png" alt="logo" width="24" height="24" class="d-inline-block align-text-top">
                        BitiFiti - {{username}}
                    </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item mx-1" role="button" @click="openHistoryForCustomer()">Istorija treninga</li>
                        <li class="nav-item mx-1" role="button" @click="openSomethingForCustomer()">Članarina</li>
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
                    <h1 class="masthead-heading mb-0">Moje clanarine</h1>
                </div>
            </div>
        </header>

        <!-- tabela -->
            <section id="scroll">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th v-on:click="sortList('name')">Ime članarine</th>
                                    <th v-on:click="sortList('price')">Cijena</th>
                                    <th v-on:click="sortList('numberOfTrainings')">Broj termina</th>
                                    <th>Promo kod</th>
                                    <th>Kupi</th>
                                </tr>
                            </thead>
                            <tbody v-for="thisFee in fees">
                                <tr>
                                    <td>{{thisFee.name}}</td>
                                    <td>{{thisFee.price}}</td>
                                    <td>{{thisFee.numberOfTrainings}}</td>
                                    <td><input v-model="promo" class="form-control" placeholder="Unesite promo kod"></td>
                                    <td><div class="btn btn-outline-dark rounded-pill" @click="getFee(thisFee)">Potvrdi</div></td>
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
        this.getAllFees();
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
        sortList(sortBy) {
			if (this.sortedbyASC) {
				this.sportObjects.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
				this.sortedbyASC = false;
			} else {
				this.sportObjects.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
				this.sortedbyASC = true;
			}
		},
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        getAllFees: function () {
			axios
			.get('rest/fees/')
			.then(response=> {this.fees=response.data})
		},
        openHome: function(){
            this.$router.push("/homeCustomer/" + this.username)
        },
        openMyProfilePage: function(){
            this.$router.push("/myProfile/" + this.username)
        },
        openSomethingForCustomer: function(){
            this.$router.push("/customerFee/" + this.username)
        },
        openHistoryForCustomer: function(){
            this.$router.push("/historyTrainings/" + this.username)
        },
        // kod usera treba da se stavi novi fee
        getFee: function (thisFee) {
            if(this.promo===''){
                axios
                    .put('rest/users/customerGetsFee/' + this.username, thisFee)
                    .then(this.$router.push("/homeCustomer/" + this.username))
            }
            else{
                axios
                .get('rest/promoCode/' + this.promo)
                .then(
                    response=> {this.promoCode=response.data;
                        if(this.promoCode){
                            thisFee.price = thisFee.price*(1 - this.promoCode.percent*0.01);
                        }
                        axios
                        .put('rest/users/customerGetsFee/' + this.username, thisFee)
                        .then(this.$router.push("/homeCustomer/" + this.username))
                    }
                )
                .catch(
                    this.$router.push("/homeCustomer/" + this.username)
                )
            }
            
		},
    }
});