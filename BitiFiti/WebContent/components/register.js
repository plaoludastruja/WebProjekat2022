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
                userType: 3,
                fee: {}
		  	},
            greska: "",
	    }
	},
	    template: `
        
<div class="d-flex flex-column min-vh-100">


    <!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom text-bg-dark">
                <div class="container px-5">
                    <a class="navbar-brand" href="http://localhost:8080/BitiFiti/#/">
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
        

        <section class="vh-100 bg-dark">
            <div class="container py-1 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-xl-10">
                        <div class="card card-registration" style="border-radius: 1rem;">
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://images.unsplash.com/photo-1575898311302-0d04de38c259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    alt="Sample photo" class="img-fluid"
                                    style="border-top-left-radius: 1rem; border-bottom-left-radius: 1rem;" />
                                </div>
                                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div class="card-body p-md-5 text-black">
                                        <h3 class="mb-3">Registrujte se</h3>
        
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
        
                                        <div class="d-md-flex justify-content-start align-items-center mb-1 py-2">
                                            <h6 class="mb-0 me-4">Pol: </h6>
                                            <div class="form-check form-check-inline mb-0 me-4">
                                                <input v-model="user.gender" value="1" class="form-check-input" type="radio"/>
                                                <label class="form-check-label">Žensko</label>
                                            </div>
                                            <div class="form-check form-check-inline mb-0 me-4">
                                                <input v-model="user.gender" value="0" class="form-check-input" type="radio"/>
                                                <label class="form-check-label">Muško</label>
                                            </div>
                                        </div>
        
                                        <div class="form-outline mb-1">
                                            <input v-model="user.dateOfBirth" type="date" class="form-control form-control-lg" />
                                            <label class="form-label">Datum rođenja</label>
                                        </div>
        
                                        <div class="form-outline mb-1">
                                            <input v-model="user.username" type="text" class="form-control form-control-lg" />
                                            <label class="form-label">Korisničko ime</label>
                                        </div>
        
                                        <div class="form-outline mb-0">
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
            <footer class="py-5 bg-black mt-auto">
                <div class="container px-5"><p class="m-0 text-center text-white small">Copyright &copy; Đorđe & Boško doo</p></div>
            </footer>
        


</div>`,

    methods: {
        registerUser: function() {
            axios
            .post('rest/users/register', this.user)
            .then(response=> {
                this.$router.push("/login")
            })
            .catch(err => {
                this.greska = "Korisničko ime je zauzeto!";
            })
        }
    }
});