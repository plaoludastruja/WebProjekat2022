package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.SportObject;

public class SportObjectDAO {
	private List<SportObject> sportObjects;
	private String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\sport_objects.json";
	
	public SportObjectDAO() {
		if (sportObjects == null)
		{
			sportObjects = new ArrayList<SportObject>();
			loadSportObjects();
		}
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
}
