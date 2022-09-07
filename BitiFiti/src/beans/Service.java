package beans;

import enums.ServiceType;

public class Service {
	private String name;
	private ServiceType serviceType;
	private String sportObject;
	private int duration;
	private int price;
	private String trainer;
	private String description;
	private String image;
	
	
	public Service() {
		super();
	}


	public Service(String name, ServiceType serviceType, String sportObject, int duration, int price, String trainer,
			String description, String image) {
		super();
		this.name = name;
		this.serviceType = serviceType;
		this.sportObject = sportObject;
		this.duration = duration;
		this.price = price;
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


	public String getSportObject() {
		return sportObject;
	}


	public void setSportObject(String sportObject) {
		this.sportObject = sportObject;
	}


	public int getDuration() {
		return duration;
	}


	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getPrice() {
		return price;
	}


	public void setPrice(int price) {
		this.price = price;
	}


	public String getTrainer() {
		return trainer;
	}


	public void setTrainer(String trainer) {
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
