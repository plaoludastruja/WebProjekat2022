package services;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Service;
import beans.SportObject;
import dao.SportObjectDAO;
import dao.UserDAO;

@Path("sportObjects")
public class SportObjectService {
	@Context
	ServletContext ctx;
	public SportObjectService() {
		
	}
	
	@PostConstruct
	private void init() {
		if (ctx.getAttribute("sportObjectDAO") == null) {
			ctx.setAttribute("sportObjectDAO", new SportObjectDAO());
		}
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@GET
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<SportObject> findAllSportObjects(@Context HttpServletRequest request){
		SportObjectDAO sportObjectDAO = (SportObjectDAO)ctx.getAttribute("sportObjectDAO");
		return sportObjectDAO.getAll();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public SportObject getSportObject(@PathParam("id") String id) {
		SportObjectDAO sportObjectDAO = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		return sportObjectDAO.getByName(id);
	}

	@POST
	@Path("/addSportObject")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response newSportObject(SportObject sportObject, @Context HttpServletRequest request) {
		SportObjectDAO sportObjectDAO = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		if(!sportObjectDAO.addSportObject(sportObject)) {
			return Response.status(400).entity("Korisnicko ime je zauzeto").build();
		}
		return Response.status(200).build();
	}

	// nije mi trebala
	@GET
	@Path("/serviceBySportObject/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Service> service(@PathParam("id") String id) {
		SportObjectDAO sportObjectDAO = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		return sportObjectDAO.findServicestBySportObject(id);
	}
	// nije mi trebala
	@GET
	@Path("/serviceBySportObject")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Service> service( @Context HttpServletRequest request) {
		SportObjectDAO sportObjectDAO = (SportObjectDAO) ctx.getAttribute("sportObjectDAO"); 
		return sportObjectDAO.findServicestBySportObject(request.getParameter("name").replace("%20", " "));
	}
}
