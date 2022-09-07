package beans;

import java.io.Serializable;
import java.util.List;

import enums.Gender;
import enums.UserType;

public class User implements Serializable {
	
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Gender gender;
	private String dateOfBirth;
	private UserType userType;
	private List<Service> trainings;
	private double fee; //Bice tip FEE
	private String sportsObject;
	private List<String> visitedSportsObjects;
	private int points;
	private CustomerType customerType;
	
	
	public User() {
	}
	

	public User(String username, String password, String firstName, String lastName, Gender gender, String dateOfBirth,
			UserType userType, List<Service> trainings, double fee, String sportsObject,
			List<String> visitedSportsObjects, int points, CustomerType customerType) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.userType = userType;
		this.trainings = trainings;
		this.fee = fee;
		this.sportsObject = sportsObject;
		this.visitedSportsObjects = visitedSportsObjects;
		this.points = points;
		this.customerType = customerType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public List<Service> getTrainings() {
		return trainings;
	}

	public void setTrainings(List<Service> trainings) {
		this.trainings = trainings;
	}

	public double getFee() {
		return fee;
	}

	public void setFee(Double fee) {
		this.fee = fee;
	}

	public String getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(String sportsObject) {
		this.sportsObject = sportsObject;
	}

	public List<String> getVisitedSportsObjects() {
		return visitedSportsObjects;
	}

	public void setVisitedSportsObjects(List<String> visitedSportsObjects) {
		this.visitedSportsObjects = visitedSportsObjects;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public void addTraining(Service s) {
		trainings.add(s);
	}



	/*
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", username=" + username
				+ ", password=" + password + "]";
	}
	*/
	private static final long serialVersionUID = 6640936480584723344L;

}
