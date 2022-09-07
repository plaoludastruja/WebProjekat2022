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
	private List<SportObject> sportObjects;
	private String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\data\\sport_objects.json";
	
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
	
	public SportObject getByName(String name) {
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
	
	public void saveSportObjects() {
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
