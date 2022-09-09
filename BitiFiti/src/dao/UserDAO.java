package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Fee;
import beans.Service;
import beans.SportObject;
import beans.User;
import enums.UserType;


public class UserDAO {
	//private Map<String, User> users = new HashMap<>();
	private static List<User> users;
	private static String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\data\\users.json";
	
	
	public UserDAO() {
		if(users == null) {
			users = new ArrayList<User>();
			loadUsers();
		}
	}
	
	public List<User> getAll() {
		return users;
	}
	
	public List<User> freeManagers(){
		List<User> freeManagers = new ArrayList<User>();
		for(User u: users)
		{
			if(u.getUserType() == UserType.MANAGER && u.getSportsObject() == null)
			{
				freeManagers.add(u);
			}
		}
		return freeManagers;
	}
	
	public List<User> findAllTrainers(){
		List<User> trainers = new ArrayList<User>();
		for(User u: users)
		{
			if(u.getUserType() == UserType.TRAINER)
			{
				trainers.add(u);
			}
		}
		return trainers;
	}
	
	public List<Service> getTrainersServices(String trainer){
		User t = getByUsername(trainer);
		return t.getTrainings();
	}
	
	public void deleteService(String trainer, Service service) {
		User t = getByUsername(trainer);
		List<Service> services = getTrainersServices(trainer);
		
		for(Service s: services)
		{
			if(s.getName().equals(service.getName()))
			{
				//List<Service> objServices = SportObjectDAO.getByName(s.getSportObject()).getServices();
				services.remove(s);				
				//objServices.remove(s);
				
				t.setTrainings(services);
				saveUsers();
				//SportObjectDAO.getByName(t.getSportsObject()).setServices(objServices);
				//SportObjectDAO.saveSportObjects();
				return;
			}
		}
	
	}
	
	public static User getByUsername(String username) {
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				return u;
			}
		}
		return null;
	}
	
	public boolean addUser(User user) {
		for(User u : users) {
			if(u.getUsername().equals(user.getUsername())) {
				return false;
			}		
		}
		List<String> emptyList = new ArrayList<String>();
		user.setTrainingHistory(emptyList);
		users.add(user);
		saveUsers();
		return true;
	}
	
	public void addTrainingToTainer(Service s) {
		getByUsername(s.getTrainer()).addTraining(s);
	}
	
	public void customerGetsFee(String customerId, Fee fee) {
		User customer = getByUsername(customerId);
		fee.setStatus("ACTIVE");
		LocalDate datum = LocalDate.now();
		int numOfDays = fee.getNumberOfDays();
		fee.setStartDate(datum.toString());	
		fee.setEndDate(LocalDate.now().plusDays(numOfDays).toString());
		customer.setFee(fee);
		saveUsers();
	}
	
	public void makeTrainingReservation(String customerId, Service service) {
		User customer = getByUsername(customerId);
		if (customer.getFee().getStatus().equals("ACTIVE") && customer.getFee().getNumberOfTrainings() > 0) {
			List<String> history = customer.getTrainingHistory();
			history.add(service.getName());
			Fee fee = customer.getFee();
			fee.setNumberOfTrainings(fee.getNumberOfDays() - 1);
			customer.setFee(fee);
			saveUsers();
		}
	}
	
	public boolean editUser(User user) {
		for(User u : users) {
			if(u.getUsername().equals(user.getUsername())) {
				u.setFirstName(user.getFirstName());
				u.setLastName(user.getLastName());
				u.setDateOfBirth(user.getDateOfBirth());
				//u.setUsername(user.getUsername());
				u.setPassword(user.getPassword());
				saveUsers();
				return true;
			}		
		}	
		return false;
	}
	
	public void loadUsers() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			users = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), User[].class)));
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
	
	public static void saveUsers() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(path).toFile(), users);
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
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	
	/*
	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String firstName = st.nextToken().trim();
					String lastName = st.nextToken().trim();
					String email = st.nextToken().trim();
					String username = st.nextToken().trim();
					String password = st.nextToken().trim();
					users.put(username, new User(firstName, lastName, email, username, password));
				}
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}*/
	
}
