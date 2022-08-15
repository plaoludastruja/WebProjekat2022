package beans;

import enums.ServiceType;

public class Service {
	private String name;
	private ServiceType serviceType;
	private SportObject sportObject;
	private int duration;
	private User trainer;
	private String description;
	private String image;
	
	
	public Service() {
		super();
	}


	public Service(String name, ServiceType serviceType, SportObject sportObject, int duration, User trainer,
			String description, String image) {
		super();
		this.name = name;
		this.serviceType = serviceType;
		this.sportObject = sportObject;
		this.duration = duration;
		this.trainer = trainer;
		this.description = description;
		this.image = image;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public ServiceType getServiceType() {
		return serviceType;
	}


	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}


	public SportObject getSportObject() {
		return sportObject;
	}


	public void setSportObject(SportObject sportObject) {
		this.sportObject = sportObject;
	}


	public int getDuration() {
		return duration;
	}


	public void setDuration(int duration) {
		this.duration = duration;
	}


	public User getTrainer() {
		return trainer;
	}


	public void setTrainer(User trainer) {
		this.trainer = trainer;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}
		
}
