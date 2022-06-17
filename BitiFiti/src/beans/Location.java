package beans;

public class Location {
	private double longitude;
	private double latitude;
	private String streetName;
	private String streetNumber;
	private String city;
	private String zipCode;
	
	public Location() {
		super();
	}
	
	public Location(double longitude, double latitude, String streetName, String streetNumber, String city,
			String zipCode) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.streetName = streetName;
		this.streetNumber = streetNumber;
		this.city = city;
		this.zipCode = zipCode;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	
	
	
}
