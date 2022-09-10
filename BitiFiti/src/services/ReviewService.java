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
import beans.Review;
import beans.SportObject;
import dao.FeeDAO;
import dao.ReviewDAO;
import dao.SportObjectDAO;
import dao.UserDAO;

@Path("reviews")
public class ReviewService {
	@Context
	ServletContext ctx;
	
	public ReviewService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("ReviewDAO") == null) {
			ctx.setAttribute("ReviewDAO", new ReviewDAO());
		}
	}
	
	@GET
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Review> getAllReviews(@Context HttpServletRequest request){
		ReviewDAO reviewDAO = (ReviewDAO)ctx.getAttribute("ReviewDAO");
		return reviewDAO.getAll();
	}
	
	@GET
	@Path("/approved")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Review> getApprovedReviews(@Context HttpServletRequest request){
		ReviewDAO reviewDAO = (ReviewDAO)ctx.getAttribute("ReviewDAO");
		return reviewDAO.getApproved();
	}
	
	@GET
	@Path("/fromOneObject/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Review> getApprovedFromOneObject(@PathParam("id") String id){
		ReviewDAO reviewDAO = (ReviewDAO)ctx.getAttribute("ReviewDAO");
		return reviewDAO.getApprovedFromOneObject(id);
	}

	@GET
	@Path("/allCommentsSportObject/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Review> getAllFromOneObject(@PathParam("id") String id){
		ReviewDAO reviewDAO = (ReviewDAO)ctx.getAttribute("ReviewDAO");
		return reviewDAO.getAllFromOneObject(id);
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addReview(Review review, @Context HttpServletRequest request){
		ReviewDAO reviewDAO = (ReviewDAO)ctx.getAttribute("ReviewDAO");
		reviewDAO.addReview(review);
	}
	
	@PUT
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void approve(Review review, @Context HttpServletRequest request){
		ReviewDAO reviewDAO = (ReviewDAO)ctx.getAttribute("ReviewDAO");
		reviewDAO.approve(review);
	}
	
}
