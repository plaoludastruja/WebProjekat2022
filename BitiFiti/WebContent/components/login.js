Vue.component("login", { 
	data: function () {
	    return {
	      products: null
	    }
	},
	    template: ` 
    	<div>
    		<h3>Ovo je login ekran</h3>
        <form id="forma">
            <table>
                <tr><td>Username</td><td><input type="text" name="username"></td></tr>
                <tr><td>Password</td><td><input type="password" name="password"></td></tr>
                <tr><td><input type="submit" value="Login"></td></tr>
            </table>
            <p id="error" hidden="true"></p>
            <p id="success" hidden="true"></p>
	    </form>
    	<button v-on:click = "login">pocetni Ekran</button>
    	</div>		  
    	`,
    mounted () {/*
        axios
          .get('rest/products/')
          .then(response => (this.products = response.data))*/
    },
    methods: {
    	login : function() {
    		this.$router.push("/")	
    	}
    }
});