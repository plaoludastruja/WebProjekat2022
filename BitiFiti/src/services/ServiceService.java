package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Product;
import beans.Service;
import dao.ProductDAO;
//import dao.ServiceDAO;

@Path("/services")
public class ServiceService {

	@Context
	ServletContext ctx;
	
	public ServiceService() {
	}
	
	/*@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("serviceDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("serviceDAO", new ServiceDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Service> getServices() {
		ServiceDAO dao = (ServiceDAO) ctx.getAttribute("serviceDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Service getService(@PathParam("id") String id) {
		ServiceDAO dao = (ServiceDAO) ctx.getAttribute("serviceDAO");
		return dao.findProduct(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Service getServices(Product product) {
		ServiceDAO dao = (ServiceDAO) ctx.getAttribute("serviceDAO");
		return dao.save(product);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Service getServices(@PathParam("id") String id, Product product) {
		ServiceDAO dao = (ServiceDAO) ctx.getAttribute("serviceDAO");
		return dao.update(id, product);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void getServices(@PathParam("id") String id) {
		ServiceDAO dao = (ServiceDAO) ctx.getAttribute("serviceDAO");
		dao.delete(id);
	}*/
}
