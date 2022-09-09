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
import beans.SportObject;
import dao.FeeDAO;
import dao.SportObjectDAO;
import dao.UserDAO;

@Path("fees")
public class FeeService {
	@Context
	ServletContext ctx;
	
	public FeeService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("FeeDAO") == null) {
			ctx.setAttribute("FeeDAO", new FeeDAO());
		}
	}
	
	@GET
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Fee> getAllFees(@Context HttpServletRequest request){
		FeeDAO feeDAO = (FeeDAO)ctx.getAttribute("FeeDAO");
		return feeDAO.getAll();
	}
}
