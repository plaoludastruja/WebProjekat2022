package services;
import java.text.ParseException;
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

import beans.PromoCode;
import dao.PromoCodeDAO;

@Path("promoCode")
public class PromoCodeService {
	@Context
	ServletContext ctx;
	public PromoCodeService() {
		
	}
	
	@PostConstruct
	private void init() {
		if (ctx.getAttribute("promoCodeDAO") == null) {
			ctx.setAttribute("promoCodeDAO", new PromoCodeDAO());
		}
	}
	
	/*@GET
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<SportObject> findAllSportObjects(@Context HttpServletRequest request){
		SportObjectDAO sportObjectDAO = (SportObjectDAO)ctx.getAttribute("sportObjectDAO");
		return sportObjectDAO.getAll();
	}*/

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public PromoCode getPromoCode(@PathParam("id") String id) throws ParseException {
		PromoCodeDAO promoCodeDAO = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		return promoCodeDAO.getByName(id);
	}

	@POST
	@Path("/addPromoCode")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response newPromoCode(PromoCode promoCode, @Context HttpServletRequest request) {
		PromoCodeDAO promoCodeDAO = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		if(!promoCodeDAO.addPromoCode(promoCode)) {
			return Response.status(400).entity("Promo kod vec postoji").build();
		}
		return Response.status(200).build();
	}
	
	/*@POST
	@Path("/addNewService/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response newService(Service service, @PathParam("id") String id, @Context HttpServletRequest request) {
		SportObjectDAO sportObjectDAO = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		if(!sportObjectDAO.addNewService(service, id)) {
			return Response.status(400).entity("Ime sadrzaja je zauzeto").build();
		}
		return Response.status(200).build();
	}*/
}
