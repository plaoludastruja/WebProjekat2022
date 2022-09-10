package beans;

public class Review {
	private int grade;
	private String comment;
	private String username;
	private String sportObjectName;
	private boolean isApproved;
	
	public Review() {}
	
	public Review(int grade, String comment, String username, String sportObjectName, boolean isApproved) {
		super();
		this.grade = grade;
		this.comment = comment;
		this.username = username;
		this.sportObjectName = sportObjectName;
		this.isApproved = isApproved;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getSportObjectName() {
		return sportObjectName;
	}

	public void setSportObjectName(String sportObjectName) {
		this.sportObjectName = sportObjectName;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	
	
	
}
