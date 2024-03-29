package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Service;
import beans.SportObject;
import dao.UserDAO;

public class SportObjectDAO {
	private static List<SportObject> sportObjects;
	private static String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\data\\sport_objects.json";
	
	public SportObjectDAO() {
		if (sportObjects == null)
		{
			sportObjects = new ArrayList<SportObject>();
			loadSportObjects();
		}
	}
	
	public List<SportObject> getAll(){
		return sportObjects;
	}
	
	public static SportObject getByName(String name) {
		for(SportObject o : sportObjects) {
			if(o.getName().equals(name)) {
				return o;
			}
		}
		return null;
	}

	public List<Service> findServicestBySportObject(String sportsObjectName){
		return getByName(sportsObjectName).getServices();
	}
	
	public boolean addSportObject(SportObject o) {
		if (sportObjects.contains(o))
			return false;
		sportObjects.add(o);
		saveSportObjects();
		String manager = o.getManager();
		UserDAO.getByUsername(manager).setSportsObject(o.getName());
		UserDAO.saveUsers();
		return true;
	}
	
	public boolean addNewService(Service s, String sportObjectName) {
		SportObject o = getByName(sportObjectName);
		for(Service ss : o.getServices())
		{
			if(ss.getName().equals(s.getName()))
			{
				return false;
			}
		}
		List<Service> services = o.getServices();
		services.add(s);
		o.setServices(services);
		//o.addService(s);
		saveSportObjects();
		UserDAO.getByUsername(s.getTrainer()).addTraining(s);
		UserDAO.saveUsers();
		return true;
	}
	public Service findServiceByName(String objectName, String serviceName)
	{
		SportObject o = getByName(objectName);
		for(Service s : o.getServices())
		{
			if(s.getName().equals(serviceName))
			{
				return s;
			}
		}
		return null;
	}
	
	public void deleteService(Service service) {
		SportObject o = getByName(service.getSportObject());
		List<Service> services = o.getServices();

		for(Service s: services)
		{
			if(s.getName().equals(service.getName()))
			{
				//List<Service> objServices = SportObjectDAO.getByName(s.getSportObject()).getServices();
				s.setTrainer("");
				//services.remove(s);				
				//objServices.remove(s);
				
				//t.setTrainings(services);
				//saveUsers();
				o.setServices(services);
				saveSportObjects();
				//SportObjectDAO.getByName(t.getSportsObject()).setServices(objServices);
				//SportObjectDAO.saveSportObjects();
				return;
			}

		//services.remove(service);
		//o.setServices(services);
		//saveSportObjects();
		}
	}
	
	public void editService(String objectName, String serviceName, Service newService)
	{
		SportObject o = getByName(objectName);
		for(Service s : o.getServices())
		{
			if(s.getName().equals(serviceName))
			{
				s.setDescription(newService.getDescription());
				s.setDuration(newService.getDuration());
				s.setImage(newService.getImage());
				s.setName(newService.getName());
				s.setPrice(newService.getPrice());
				s.setServiceType(newService.getServiceType());
				s.setTrainer(newService.getTrainer());
			}
		}
		saveSportObjects();
	}
	
	public boolean deleteSportObject(String name) {
		for(SportObject o : sportObjects) {
			if(o.getName().equals(name)) {
				sportObjects.remove(o);
				saveSportObjects();
				return true;
			}
		}
		return false;
	}
	
	public void loadSportObjects() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			sportObjects = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), SportObject[].class)));
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void saveSportObjects() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(path).toFile(), sportObjects);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
