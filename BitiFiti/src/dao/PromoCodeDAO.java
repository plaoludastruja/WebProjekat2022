package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.PromoCode;
import beans.Service;
import beans.SportObject;

public class PromoCodeDAO {
	private List<PromoCode> promoCodes;
	private String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\data\\promo_codes.json";
	
	public PromoCodeDAO() {
		if (promoCodes == null)
		{
			promoCodes = new ArrayList<PromoCode>();
			loadPromoCodes();
		}
	}
	
	public List<PromoCode> getAll(){
		return promoCodes;
	}
	
	public PromoCode getByName(String name) throws ParseException { 

		for(PromoCode o : promoCodes) {
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(o.getExpirationDate());
			if(o.getName().equals(name) &&
			o.getUsageNumber() > 0
			&& date1.toInstant()
				      .atZone(ZoneId.systemDefault())
				      .toLocalDate().compareTo(LocalDate.now()) > 0  ) {
				int number = o.getUsageNumber();
				o.setUsageNumber(number-1);
				savePromoCodes();
				return o;
			}
		}
		return null;
	}
	
	public boolean addPromoCode(PromoCode o) {
		if (promoCodes.contains(o))
			return false;
		promoCodes.add(o);
		savePromoCodes();
		return true;
	}
	
	public boolean deleteSportObject(String name) {
		for(PromoCode o : promoCodes) {
			if(o.getName().equals(name)) {
				promoCodes.remove(o);
				savePromoCodes();
				return true;
			}
		}
		return false;
	}
	
	public void loadPromoCodes() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			promoCodes = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), PromoCode[].class)));
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
	
	public void savePromoCodes() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(path).toFile(), promoCodes);
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
