// naziv komponente kao u app.js
Vue.component("editMyProfile", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            user:{},
            greska: "",
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
                        BitiFiti - {{username}}
                    </a>
                </div> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        
                        <li class="nav-item mx-1" role="button" @click="logOut()">Odjavi se</li>
                    </ul>
                </div>
            </div>
        </nav>


    <!-- Info-->
    <section>
        <div class="container">
            <div class="main-body">
                <div class="row d-flex justify-content-center align-items-center h-100" >

                    <div class="col-md-8">
                        <div class="card my-4">
                            <div class="card-body">

                                <div class="row mb-0">
                                    <div class="col-md-6 mb-0">
                                        <div class="form-outline">
                                            <input v-model="user.firstName" type="text" class="form-control form-control-lg" />
                                            <label class="form-label">Ime</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-0">
                                        <div class="form-outline">
                                            <input v-model="user.lastName" type="text" class="form-control form-control-lg" />
                                            <label class="form-label">Prezime</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-outline mb-1">
                                    <input v-model="user.dateOfBirth" type="date" class="form-control form-control-lg" />
                                    <label class="form-label">Datum rođenja</label>
                                </div>

                                <div class="form-outline mb-0">
                                    <input v-model="user.password" type="text" class="form-control form-control-lg" />
                                    <label class="form-label">Šifra</label>
                                </div>

                                <div style="color: red;" id="greska">{{greska}}</div>

                                <div class="d-flex justify-content-end pt-3">
                                    <button @click="editData()" type="button" class="btn btn-warning btn-lg ms-2">Izmijeni podatke</button>
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
        this.getCurrentUser();
    },
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.user=response.data})
		},
        openHomepage: function(){
            this.$router.push("/myProfile/" + this.username)
        },
        editData: function(){
            axios
			.post('rest/users/editMyProfile', this.user)
			.then(response=> {this.$router.push("/myProfile/" + this.username)})
            .catch(err => {
                this.greska = "Korisničko ime je zauzeto!";
            })
        },
    }
});