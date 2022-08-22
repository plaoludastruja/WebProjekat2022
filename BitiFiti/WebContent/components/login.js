Vue.component("login", { 
    data: function () {
	    return {
	        user: {
				username: '',
                password: '',
		  	},
            greska: "",
	    }
	},
	    template: `<div>


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
        

        <section class="vh-100" style="background-color: #f4a552;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-xl-10">
                        <div class="card" style="border-radius: 1rem;">
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                                    alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                                </div>
                                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div class="card-body p-4 p-lg-5 text-black">

                                            <h3 class="mb-4">Prijavite se</h3>

                                            <div class="form-outline mb-2">
                                                <input v-model="user.username" type="text" class="form-control form-control-lg" required/>
                                                <label class="form-label">Korisničko ime</label>
                                            </div>

                                            <div class="form-outline mb-2">
                                                <input v-model="user.password" type="password" class="form-control form-control-lg" />
                                                <label class="form-label">Šifra</label>
                                            </div>

                                            <div style="color: red;" id="greska">{{greska}}</div>

                                            <div class="d-flex justify-content-end pt-3">
                                                <button @click="checkUser()" type="button" class="btn btn-warning btn-lg ms-2">Prijava</button>
                                            </div>

                                            <p class="mb-5 pb-lg-2" style="color: #393f81;">Nemate nalog? <a href="http://localhost:8080/BitiFiti/#/register"
                                            style="color: #393f81;">Registujte se</a></p>
        
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

    methods: {
        checkUser: function() {
            axios
            .post('rest/users/login', this.user)
            .then(
                axios
                .get('rest/users/currentUser')
                .then(response => {
                    if(response.data.userType=='ADMINISTRATOR'){
                        this.$router.push("/homeAdministrator/" + this.user.username);
                    } else if(response.data.userType=='MANAGER'){
                        this.$router.push("/homeManager/" + this.user.username);
                    }else if(response.data.userType=='TRAINER'){
                        this.$router.push("/homeTrainer/" + this.user.username);
                    }else if(response.data.userType=='CUSTOMER'){
                        this.$router.push("/homeCustomer/" + this.user.username);
                    }
                })
            )
            .catch(err => {
                this.greska = "Pogrešno korisničko ime ili šifra!";
            })
        }
        
    }
});