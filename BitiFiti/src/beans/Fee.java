package beans;

public class Fee {
	
	private String name;
	private int numberOfTrainings;
	private int numberOfDays;
	private double price; // cijena ce se promjeniti ako bude promo kod
	
	private String startDate; // dodaje se kad se posalje upit, status postaje ACTIVE
	private String endDate; // startDate.addDays(umberOfDays), kad prodje ovaj datum, status postaje NOTACTIVE
	private String status; // kad se kupi:ACTIVE, kad prodje vrijeme ili potrose se treninzi NOTACITVE
	private int trainingsUsed; // povecava se kad kupac rezervise trening, ne moze biti veci od numberOfTrainings
	
	
	public Fee() {
		super();
	}


	public Fee(String name, int numberOfTrainings, int numberOfDays, double price, String startDate, String endDate,
			String status, int trainingsUsed) {
		super();
		this.name = name;
		this.numberOfTrainings = numberOfTrainings;
		this.numberOfDays = numberOfDays;
		this.price = price;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
		this.trainingsUsed = trainingsUsed;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getNumberOfTrainings() {
		return numberOfTrainings;
	}


	public void setNumberOfTrainings(int numberOfTrainings) {
		this.numberOfTrainings = numberOfTrainings;
	}


	public int getNumberOfDays() {
		return numberOfDays;
	}


	public void setNumberOfDays(int numberOfDays) {
		this.numberOfDays = numberOfDays;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public String getStartDate() {
		return startDate;
	}


	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public String getEndDate() {
		return endDate;
	}


	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public int getTrainingsUsed() {
		return trainingsUsed;
	}


	public void setTrainingsUsed(int trainingsUsed) {
		this.trainingsUsed = trainingsUsed;
	}
	
}
