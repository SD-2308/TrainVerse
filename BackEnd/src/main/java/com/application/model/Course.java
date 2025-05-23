package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String coursename;
    private String courseid;
    private String enrolleddate;
    private String instructorname;
    private String instructorinstitution;
    private String enrolledcount;
    private String youtubeurl;
    private String websiteurl;
    private String coursetype;
    private String skilllevel;
    private String language;
    private String description;

    // Newly added fields
    private String price;
    private String rating;
    private String about;
    private String faq1Question;
    private String faq1Answer;
    private String faq2Question;
    private String faq2Answer;
    private String faq3Question;
    private String faq3Answer;
    private String duration;
    private String imageUrl;

    private String department; // ✅ Added field

    public Course() {
        super();
    }

    public Course(int id, String coursename, String courseid, String enrolleddate, String instructorname,
                  String instructorinstitution, String enrolledcount, String youtubeurl, String websiteurl,
                  String coursetype, String skilllevel, String language, String description, String price,
                  String rating, String about, String faq1Question, String faq1Answer,
                  String faq2Question, String faq2Answer, String faq3Question, String faq3Answer,
                  String duration, String imageUrl, String department) {

        this.id = id;
        this.coursename = coursename;
        this.courseid = courseid;
        this.enrolleddate = enrolleddate;
        this.instructorname = instructorname;
        this.instructorinstitution = instructorinstitution;
        this.enrolledcount = enrolledcount;
        this.youtubeurl = youtubeurl;
        this.websiteurl = websiteurl;
        this.coursetype = coursetype;
        this.skilllevel = skilllevel;
        this.language = language;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.about = about;
        this.faq1Question = faq1Question;
        this.faq1Answer = faq1Answer;
        this.faq2Question = faq2Question;
        this.faq2Answer = faq2Answer;
        this.faq3Question = faq3Question;
        this.faq3Answer = faq3Answer;
        this.duration = duration;
        this.imageUrl = imageUrl;
        this.department = department;
    }

    // Getters and Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCoursename() { return coursename; }
    public void setCoursename(String coursename) { this.coursename = coursename; }

    public String getCourseid() { return courseid; }
    public void setCourseid(String courseid) { this.courseid = courseid; }

    public String getEnrolleddate() { return enrolleddate; }
    public void setEnrolleddate(String enrolleddate) { this.enrolleddate = enrolleddate; }

    public String getInstructorname() { return instructorname; }
    public void setInstructorname(String instructorname) { this.instructorname = instructorname; }

    public String getInstructorinstitution() { return instructorinstitution; }
    public void setInstructorinstitution(String instructorinstitution) { this.instructorinstitution = instructorinstitution; }

    public String getEnrolledcount() { return enrolledcount; }
    public void setEnrolledcount(String enrolledcount) { this.enrolledcount = enrolledcount; }

    public String getYoutubeurl() { return youtubeurl; }
    public void setYoutubeurl(String youtubeurl) { this.youtubeurl = youtubeurl; }

    public String getWebsiteurl() { return websiteurl; }
    public void setWebsiteurl(String websiteurl) { this.websiteurl = websiteurl; }

    public String getCoursetype() { return coursetype; }
    public void setCoursetype(String coursetype) { this.coursetype = coursetype; }

    public String getSkilllevel() { return skilllevel; }
    public void setSkilllevel(String skilllevel) { this.skilllevel = skilllevel; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getFaq1Question() { return faq1Question; }
    public void setFaq1Question(String faq1Question) { this.faq1Question = faq1Question; }

    public String getFaq1Answer() { return faq1Answer; }
    public void setFaq1Answer(String faq1Answer) { this.faq1Answer = faq1Answer; }

    public String getFaq2Question() { return faq2Question; }
    public void setFaq2Question(String faq2Question) { this.faq2Question = faq2Question; }

    public String getFaq2Answer() { return faq2Answer; }
    public void setFaq2Answer(String faq2Answer) { this.faq2Answer = faq2Answer; }

    public String getFaq3Question() { return faq3Question; }
    public void setFaq3Question(String faq3Question) { this.faq3Question = faq3Question; }

    public String getFaq3Answer() { return faq3Answer; }
    public void setFaq3Answer(String faq3Answer) { this.faq3Answer = faq3Answer; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

	public Object map(Object object) {
		
		return null;
	}

}
