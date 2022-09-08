// naziv komponente kao u app.js
Vue.component("myProfile", { 
	// podaci
	data: function () {
	    return {
            username: this.$route.params.username,
            user:{},
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
                <div class="row gutters-sm my-4">

                    <div class="col-md-4 my-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img v-if="user.userType === 'ADMINISTRATOR'" src="components/Resources/administrator.png"  class="rounded-circle" width="150">
                                    <img v-else-if="user.userType === 'MANAGER'" src="components/Resources/manager.png"  class="rounded-circle" width="150">
                                    <img v-else-if="user.userType === 'BUYER'" src="components/Resources/customer.png"  class="rounded-circle" width="150">
                                    <img v-else src="components/Resources/trainer.png" class="rounded-circle" width="150">
                                    <div class="mt-3">
                                        <h4>{{user.username}}</h4>
                                        <p class="text-secondary mb-1">{{user.userType}}</p>
                                        <p v-if="user.userType === 'CUSTOMER'" class="text-secondary mb-1">{{user.customerType.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="card mb-1">
                            <div class="card-body">
                                <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Ime</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">{{user.firstName}}</div>
                                </div>
                                <hr>
                                <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Prezime</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">{{user.lastName}}</div>
                                </div>
                                <hr>
                                <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Pol</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">{{user.gender}}</div>
                                </div>
                                <hr>
                                <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Datum rodjenja</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">{{user.dateOfBirth}}</div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <a @click="editData()" class="btn btn-outline-dark" target="__blank">Izmijeni profil</a>
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
            this.$router.push("/editMyProfile/" + this.username)
        },
    }
});