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
    		<h3>Ovo je pocetni ekran</h3>
    		<button v-on:click = "login">Login Ekran</button>
    	</div>		  
    	`,
	// n apocetku
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