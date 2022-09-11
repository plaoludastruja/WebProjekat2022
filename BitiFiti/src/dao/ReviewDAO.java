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
import beans.Review;
import beans.Service;
import beans.SportObject;
import dao.UserDAO;

public class ReviewDAO {
	private static List<Review> reviews;
	private static String path = "D:\\Fax\\WEB\\Projekat\\WebProjekat2022\\BitiFiti\\WebContent\\data\\reviews.json";
	
	public ReviewDAO() {
		if (reviews == null)
		{
			reviews = new ArrayList<Review>();
			loadReviews();
		}
	}
	
	public List<Review> getAll(){
		return reviews;
	}
	
	public List<Review> getApproved(){
		List<Review> approvedReviews = new ArrayList<Review>();
		for(Review r : reviews) {
			if(r.isApproved()) {
				approvedReviews.add(r);
			}
		}
		return approvedReviews;
	}
	
	public List<Review> getApprovedFromOneObject(String sportObject){
		List<Review> reviewsFromOneObject = new ArrayList<Review>();
		List<Review> approvedReviews = getApproved();
		for(Review r : approvedReviews) {
			if(r.getSportObjectName().equals(sportObject)) {
				reviewsFromOneObject.add(r);
			}
		}
		return reviewsFromOneObject;
	}

	public List<Review> getAllFromOneObject(String sportObject){
		List<Review> reviewsFromOneObject = new ArrayList<Review>();
		for(Review r : reviews) {
			if(r.getSportObjectName().equals(sportObject)) {
				reviewsFromOneObject.add(r);
			}
		}
		return reviewsFromOneObject;
	}
	
	public void approve(Review review) {
		for(Review r : reviews) {
			if(r.getComment().equals(review.getComment())) {
				r.setApproved(true);
			}
		}
		saveReviews();
		addGradeToSportObject(review);
	}
	
	public void addReview(Review review) {
		reviews.add(review);
		saveReviews();
	}

	public void addGradeToSportObject(Review review) {
		SportObject objectToGrade = SportObjectDAO.getByName(review.getSportObjectName());
		
		int newGrade = getGradeFromReviews(objectToGrade);
		
		objectToGrade.setAverageScore(newGrade);
		
		SportObjectDAO.saveSportObjects();
	}
	
	public int getGradeFromReviews(SportObject objectToGrade) {
		int number = 0;
		double gradeSum = 0;
		for(Review r : reviews) {
			if(r.getSportObjectName().equals(objectToGrade.getName())) {
				number++;
				gradeSum+=r.getGrade();
			}
		}
		return (int)gradeSum/number;
	}
	
	
	public void loadReviews() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			reviews = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Review[].class)));
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
	
	public static void saveReviews() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(path).toFile(), reviews);
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
