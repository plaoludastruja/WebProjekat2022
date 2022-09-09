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

import beans.Fee;
import beans.Service;
import beans.SportObject;
import dao.UserDAO;

public class FeeDAO {
	private static List<Fee> fees;
	private static String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\data\\fee.json";
	
	public FeeDAO() {
		if (fees == null)
		{
			fees = new ArrayList<Fee>();
			loadFees();
		}
	}
	
	public List<Fee> getAll(){
		return fees;
	}
	
	public void loadFees() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			fees = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Fee[].class)));
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
	
	public static void saveFees() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(path).toFile(), fees);
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
