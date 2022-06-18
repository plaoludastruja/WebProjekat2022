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
        

        <section class="vh-100" style="background-color: #f4a552;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-xl-10">
                        <div class="card" style="border-radius: 1rem;">
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                    alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                                </div>
                                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div class="card-body p-4 p-lg-5 text-black">

                                            <div class="d-flex align-items-center mb-3 pb-1">
                                                <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                                                <span class="h1 fw-bold mb-0">Logo</span>
                                            </div>

                                            <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Prijavite se</h5>

                                            <div class="form-outline mb-4">
                                                <input v-model="user.username" type="text" class="form-control form-control-lg" required/>
                                                <label class="form-label">Korisničko ime</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input v-model="user.password" type="password" class="form-control form-control-lg" />
                                                <label class="form-label">Šifra</label>
                                            </div>

                                            <div style="color: red;" id="greska">{{greska}}</div>

                                            <div class="pt-1 mb-4">
                                                <button @click="checkUser()" class="btn btn-warning btn-lg btn-block" type="button">Prijava</button>
                                            </div>
                                            <p class="mb-5 pb-lg-2" style="color: #393f81;">Nemate nalog? <a href="http://localhost:8080/BitiFiti/#/signin"
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
    mounted () {/*
        axios
            .get('rest/products/')
            .then(response => (this.products = response.data))*/
    },
    methods: {
        checkUser: function() {
            axios
            .post('rest/users/login', this.user)
            .then(response=> {
                    if(response.data.userType=='ADMINISTRATOR'){
                        this.$router.push("/homeLoginAdministrator/" + this.user.username);
                    } else if(response.data.rouserTypele=='MANAGER'){
                        this.$router.push("/homeLoginManager/" + this.user.username);
                    }else if(response.data.userType=='TRAINER'){
                        this.$router.push("/homeLoginTrainer/" + this.user.username);
                    }else {
                        this.$router.push("/homeLoginBuyer/" + this.user.username);
                    }
            })
            .catch(err => {
                this.greska = "Wrong password or username!";
            })
        }
    }
});