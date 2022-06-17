package beans;

import enums.ServiceType;

public class Service {
	private String name;
	private String description;
	private ServiceType serviceType;
	
	public Service(){
		super();
	}

	public Service(String name, String description, ServiceType serviceType) {
		super();
		this.name = name;
		this.description = description;
		this.serviceType = serviceType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ServiceType getServiceType() {
		return serviceType;
	}

	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}
	
	
}
