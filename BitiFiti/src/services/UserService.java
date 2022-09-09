package services;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Fee;
import beans.Product;
import beans.Service;
import beans.User;
import dao.ProductDAO;
import dao.SportObjectDAO;
import dao.UserDAO;

@Path("users")
public class UserService {
	
	@Context
	ServletContext ctx;
	
	public UserService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User loggedUser = userDao.getByUsername(user.getUsername());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
		}
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response newCustomer(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		if(!userDao.addUser(user)) {
			return Response.status(400).entity("Korisnicko ime je zauzeto").build();
		}
		return Response.status(200).build();
	}
	
//	@POST
//	@Path("/editMyProfile")
//	@Consumes(MediaType.APPLICATION_JSON)
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response editCustomer(String username, User user, @Context HttpServletRequest request) {
//		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
//		if(!userDao.addUser(user)) {
//			return Response.status(400).entity("Nije pronadjen korisnik sa tim korisnickim imenom").build();
//		}
//		return Response.status(200).build();
//	}
	
	@POST
	@Path("/editMyProfile")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void editCustomer(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		userDao.editUser(user);
	}
	
	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
//	@PUT
//	@Path("/addSportObjectToManager")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Product getProducts(User manager) {
//		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
//		dao.addSportObject()
//		return dao.update(id, product);
//	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}

	@GET
	@Path("/allUsers")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> findAllUsers(@Context HttpServletRequest request){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.getAll();
	}
	
	@GET
	@Path("/freeManagers")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> findFreeManagers(@Context HttpServletRequest request){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.freeManagers();
	}
	
	@GET
	@Path("/trainersServices/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Service> getTrainersServices( @PathParam("id") String trainer, @Context HttpServletRequest request){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.getTrainersServices(trainer);
	}
	
	@GET
	@Path("/getHistory/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Service> getHistory( @PathParam("id") String customerId,  @Context HttpServletRequest request){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.getHistory(customerId);
	}
	
	@PUT
	@Path("/trainerCancelsTraining/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteService( @PathParam("id") String trainer, Service service){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		SportObjectDAO sportObjectDAO = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");	
		userDAO.deleteService(trainer, service);
		sportObjectDAO.deleteService(service);
	}
	
	@PUT
	@Path("/customerGetsFee/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void customerGetsFee( @PathParam("id") String customerId, Fee fee){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");	
		userDAO.customerGetsFee(customerId, fee);
	}
	
	@PUT
	@Path("/makeTrainingReservation/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void makeTrainingReservation( @PathParam("id") String customerId, Service service){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");	
		userDAO.makeTrainingReservation(customerId, service);
	}
	
	@GET
	@Path("/trainers")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> findAllTrainers(@Context HttpServletRequest request){
		UserDAO userDAO = (UserDAO)ctx.getAttribute("userDAO");
		return userDAO.findAllTrainers();
	}
	
	
}
