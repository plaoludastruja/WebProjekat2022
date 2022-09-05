package beans;

import java.time.LocalDate;

public class PromoCode {
	private String name;
	private String expirationDate;
	private int usageNumber;
	private int percent;
	
	public PromoCode() {
		super();
	}
	public PromoCode(String name, String expirationDate, int usageNumber, int percent) {
		super();
		this.name = name;
		this.expirationDate = expirationDate;
		this.usageNumber = usageNumber;
		this.percent = percent;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	public int getUsageNumber() {
		return usageNumber;
	}
	public void setUsageNumber(int usageNumber) {
		this.usageNumber = usageNumber;
	}
	public int getPercent() {
		return percent;
	}
	public void setPercent(int percent) {
		this.percent = percent;
	}
	
	
}
