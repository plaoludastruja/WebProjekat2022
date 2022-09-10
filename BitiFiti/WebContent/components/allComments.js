// naziv komponente kao u app.js
Vue.component("allComments", { 
	// podaci
	data: function () {
	    return {
            reviews: [],
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
                    <h1 class="masthead-heading mb-1">Svi komentari</h1>
                    <div class="row">
                        <div class="col-sm-12 mb-2">

                        </div>
                    </div>
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
                                <th>Sportski objekat</th>
                                <th>Korisničko ime</th>
                                <th>Komentar</th>
                                <th>Ocjena</th>
                                <th>Odobren</th>
                                <th>Odobri</th>
                            </tr>
                        </thead>
                        <tbody v-for="review in reviews">
                            <tr>
                                <td>{{review.sportObjectName}}</td>
                                <td>{{review.username}}</td>
                                <td>{{review.comment}}</td>
                                <td>{{review.grade}}</td>
                                <td v-if="review.approved">Da</td>
                                <td v-else>Ne</td>
                                <td v-if="review.approved"></td>
                                <td v-else><div class="btn btn-outline-dark rounded-pill" @click="approve(review)">Odobri</div></td>
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
        this.getAllComments();
        this.getCurrentUser();
    },
	// funkcije
    methods: {
        logOut: function () {
			axios
			.post('rest/users/logout')
			.then(response=> {this.$router.push("/login")})
		},
        getAllComments: function () {
			axios
			.get('rest/reviews')
			.then(response=> {this.reviews=response.data})
		},
        getCurrentUser: function () {
			axios
			.get('rest/users/currentUser')
			.then(response=> {this.user=response.data})
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
        approve: function (review) {
			axios
			.put('rest/reviews', review)
			.then(this.$router.push("/allComments"))
		},
    }
});