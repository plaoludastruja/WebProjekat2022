// naziv komponente kao u app.js
Vue.component("homepage", { 
	// podaci
	data: function () {
	    return {
	        products: null
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
                        BitiFiti
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="#!">Sign Up</a></li>
                            <li class="nav-item"><a class="nav-link" href="http://localhost:8080/BitiFiti/#/login">Log In</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

    <!-- Header-->
            <header class="masthead text-center text-black">
                <div class="masthead-content">
                    <div class="container px-5">
                        <h1 class="masthead-heading mb-0">One Page Wonder</h1>
                        <h2 class="masthead-subheading mb-0">Will Rock Your Socks Off</h2>
                        <a class="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">Learn More</a>
                    </div>
                </div>
            </header>

    <!-- Content section 1-->
            <section id="scroll">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-lg-6 order-lg-2">
                            <div class="p-5"><img class="img-fluid rounded-circle" src="assets/img/01.jpg" alt="..." /></div>
                        </div>
                        <div class="col-lg-6 order-lg-1">
                            <div class="p-5">
                                <h2 class="display-4">For those about to rock...</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
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
	// na pocetku
    mounted () {
        axios
          .get('rest/products/')
          .then(response => (this.products = response.data))
    },
	// funkcije
    methods: {
    	login : function() {
    		this.$router.push("/login")	
    	}
    }
});