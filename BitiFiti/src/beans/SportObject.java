package beans;

import java.util.List;

import enums.SportObjectType;

public class SportObject {
	private String name;
	private SportObjectType sportObjectType;
	private List<Service> services;
	private boolean isWorking;
	private Location location;
	private String logo;
	private double averageScore;
	private String startTime;
	private String endTime;
	private String manager;
	
	public SportObject() {
		super();
	}

	public SportObject(String name, SportObjectType sportObjectType, List<Service> services, boolean isWorking,
			Location location, String logo, double averageScore, String startTime, String endTime, String manager) {
		super();
		this.name = name;
		this.sportObjectType = sportObjectType;
		this.services = services;
		this.isWorking = isWorking;
		this.location = location;
		this.logo = logo;
		this.averageScore = averageScore;
		this.startTime = startTime;
		this.endTime = endTime;
		this.manager = manager;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SportObjectType getSportObjectType() {
		return sportObjectType;
	}

	public void setSportObjectType(SportObjectType sportObjectType) {
		this.sportObjectType = sportObjectType;
	}

	public List<Service> getServices() {
		return services;
	}

	public void setServices(List<Service> services) {
		this.services = services;
	}

	public boolean isWorking() {
		return isWorking;
	}

	public void setWorking(boolean isWorking) {
		this.isWorking = isWorking;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public double getAverageScore() {
		return averageScore;
	}

	public void setAverageScore(double averageScore) {
		this.averageScore = averageScore;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}
	
	
}
