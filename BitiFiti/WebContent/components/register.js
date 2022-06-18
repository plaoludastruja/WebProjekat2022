Vue.component("register", { 
    data: function () {
	    return {
            user: {
				username: '',
                password: '',
                firstName: '',
                lastName: '',
                gender: null,
                dateOfBirth: '',
                userType: 3
		  	},
            greska: "",
	    }
	},
	    template: `<div>


    <!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#/">
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
        

        <section class="h-100 bg-dark">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card card-registration my-4">
                            <div class="row g-0">
                                <div class="col-xl-6 d-none d-xl-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                    alt="Sample photo" class="img-fluid"
                                    style="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;" />
                                </div>
                                <div class="col-xl-6">
                                    <div class="card-body p-md-5 text-black">
                                        <h3 class="mb-5">Registrujte se</h3>
        
                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <input v-model="user.firstName" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Ime</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <input v-model="user.lastName" type="text" class="form-control form-control-lg" />
                                                    <label class="form-label">Prezime</label>
                                                </div>
                                            </div>
                                        </div>
        
                                        <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                            <h6 class="mb-0 me-4">Pol: </h6>
                                            <div class="form-check form-check-inline mb-0 me-4">
                                                <input v-model="user.gender" value="0" class="form-check-input" type="radio"/>
                                                <label class="form-check-label">Žensko</label>
                                            </div>
                                            <div class="form-check form-check-inline mb-0 me-4">
                                                <input v-model="user.gender" value="1" class="form-check-input" type="radio"/>
                                                <label class="form-check-label">Muško</label>
                                            </div>
                                        </div>
        
                                        <div class="form-outline mb-4">
                                            <input v-model="user.dateOfBirth" type="date" class="form-control form-control-lg" />
                                            <label class="form-label">Datum rođenja</label>
                                        </div>
        
                                        <div class="form-outline mb-4">
                                            <input v-model="user.username" type="text" class="form-control form-control-lg" />
                                            <label class="form-label">Korisničko ime</label>
                                        </div>
        
                                        <div class="form-outline mb-4">
                                            <input v-model="user.password" type="password" class="form-control form-control-lg" />
                                            <label class="form-label">Šifra</label>
                                        </div>

                                        <div style="color: red;" id="greska">{{greska}}</div>
        
                                        <div class="d-flex justify-content-end pt-3">
                                            <button @click="registerUser()" type="button" class="btn btn-warning btn-lg ms-2">Registracija</button>
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
            <footer class="py-5 bg-black">
                <div class="container px-5"><p class="m-0 text-center text-white small">Copyright &copy; Đorđe & Boško doo</p></div>
            </footer>
        


</div>`,
    mounted () {/*
        axios
            .get('rest/products/')
            .then(response => (this.products = response.data))*/
    },
    methods: {
        registerUser: function() {
            axios
            .post('rest/users/register', this.user)
            .then(response=> {
                this.$router.push("/login")
            })
            .catch(err => {
                this.greska = "Nesto ne valja!";
            })
        }
    }
});