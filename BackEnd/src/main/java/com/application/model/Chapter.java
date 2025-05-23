package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String coursename;
    private String courseid;

    // Chapter 1
    private String chapter1name;
    private String chapter1id;
    private String chapter1description;
    private String chapter1videourl;
    private String chapter1videoname;
    private String chapter1documenturl;
    private String chapter1documentname;

    // Chapter 2
    private String chapter2name;
    private String chapter2id;
    private String chapter2description;
    private String chapter2videourl;
    private String chapter2videoname;
    private String chapter2documenturl;
    private String chapter2documentname;

    // Chapter 3
    private String chapter3name;
    private String chapter3id;
    private String chapter3description;
    private String chapter3videourl;
    private String chapter3videoname;
    private String chapter3documenturl;
    private String chapter3documentname;

    // Chapter 4
    private String chapter4name;
    private String chapter4id;
    private String chapter4description;
    private String chapter4videourl;
    private String chapter4videoname;
    private String chapter4documenturl;
    private String chapter4documentname;

    // Chapter 5
    private String chapter5name;
    private String chapter5id;
    private String chapter5description;
    private String chapter5videourl;
    private String chapter5videoname;
    private String chapter5documenturl;
    private String chapter5documentname;
    
    
	public Chapter() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Chapter(int id, String coursename, String courseid, String chapter1name, String chapter1id,
			String chapter1description, String chapter1videourl, String chapter1videoname, String chapter1documenturl,
			String chapter1documentname, String chapter2name, String chapter2id, String chapter2description,
			String chapter2videourl, String chapter2videoname, String chapter2documenturl, String chapter2documentname,
			String chapter3name, String chapter3id, String chapter3description, String chapter3videourl,
			String chapter3videoname, String chapter3documenturl, String chapter3documentname, String chapter4name,
			String chapter4id, String chapter4description, String chapter4videourl, String chapter4videoname,
			String chapter4documenturl, String chapter4documentname, String chapter5name, String chapter5id,
			String chapter5description, String chapter5videourl, String chapter5videoname, String chapter5documenturl,
			String chapter5documentname) {
		super();
		this.id = id;
		this.coursename = coursename;
		this.courseid = courseid;
		this.chapter1name = chapter1name;
		this.chapter1id = chapter1id;
		this.chapter1description = chapter1description;
		this.chapter1videourl = chapter1videourl;
		this.chapter1videoname = chapter1videoname;
		this.chapter1documenturl = chapter1documenturl;
		this.chapter1documentname = chapter1documentname;
		this.chapter2name = chapter2name;
		this.chapter2id = chapter2id;
		this.chapter2description = chapter2description;
		this.chapter2videourl = chapter2videourl;
		this.chapter2videoname = chapter2videoname;
		this.chapter2documenturl = chapter2documenturl;
		this.chapter2documentname = chapter2documentname;
		this.chapter3name = chapter3name;
		this.chapter3id = chapter3id;
		this.chapter3description = chapter3description;
		this.chapter3videourl = chapter3videourl;
		this.chapter3videoname = chapter3videoname;
		this.chapter3documenturl = chapter3documenturl;
		this.chapter3documentname = chapter3documentname;
		this.chapter4name = chapter4name;
		this.chapter4id = chapter4id;
		this.chapter4description = chapter4description;
		this.chapter4videourl = chapter4videourl;
		this.chapter4videoname = chapter4videoname;
		this.chapter4documenturl = chapter4documenturl;
		this.chapter4documentname = chapter4documentname;
		this.chapter5name = chapter5name;
		this.chapter5id = chapter5id;
		this.chapter5description = chapter5description;
		this.chapter5videourl = chapter5videourl;
		this.chapter5videoname = chapter5videoname;
		this.chapter5documenturl = chapter5documenturl;
		this.chapter5documentname = chapter5documentname;	
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getCoursename() {
		return coursename;
	}


	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}


	public String getCourseid() {
		return courseid;
	}


	public void setCourseid(String courseid) {
		this.courseid = courseid;
	}


	public String getChapter1name() {
		return chapter1name;
	}


	public void setChapter1name(String chapter1name) {
		this.chapter1name = chapter1name;
	}


	public String getChapter1id() {
		return chapter1id;
	}


	public void setChapter1id(String chapter1id) {
		this.chapter1id = chapter1id;
	}


	public String getChapter1description() {
		return chapter1description;
	}


	public void setChapter1description(String chapter1description) {
		this.chapter1description = chapter1description;
	}


	public String getChapter1videourl() {
		return chapter1videourl;
	}


	public void setChapter1videourl(String chapter1videourl) {
		this.chapter1videourl = chapter1videourl;
	}


	public String getChapter1videoname() {
		return chapter1videoname;
	}


	public void setChapter1videoname(String chapter1videoname) {
		this.chapter1videoname = chapter1videoname;
	}


	public String getChapter1documenturl() {
		return chapter1documenturl;
	}


	public void setChapter1documenturl(String chapter1documenturl) {
		this.chapter1documenturl = chapter1documenturl;
	}


	public String getChapter1documentname() {
		return chapter1documentname;
	}


	public void setChapter1documentname(String chapter1documentname) {
		this.chapter1documentname = chapter1documentname;
	}


	public String getChapter2name() {
		return chapter2name;
	}


	public void setChapter2name(String chapter2name) {
		this.chapter2name = chapter2name;
	}


	public String getChapter2id() {
		return chapter2id;
	}


	public void setChapter2id(String chapter2id) {
		this.chapter2id = chapter2id;
	}


	public String getChapter2description() {
		return chapter2description;
	}


	public void setChapter2description(String chapter2description) {
		this.chapter2description = chapter2description;
	}


	public String getChapter2videourl() {
		return chapter2videourl;
	}


	public void setChapter2videourl(String chapter2videourl) {
		this.chapter2videourl = chapter2videourl;
	}


	public String getChapter2videoname() {
		return chapter2videoname;
	}


	public void setChapter2videoname(String chapter2videoname) {
		this.chapter2videoname = chapter2videoname;
	}


	public String getChapter2documenturl() {
		return chapter2documenturl;
	}


	public void setChapter2documenturl(String chapter2documenturl) {
		this.chapter2documenturl = chapter2documenturl;
	}


	public String getChapter2documentname() {
		return chapter2documentname;
	}


	public void setChapter2documentname(String chapter2documentname) {
		this.chapter2documentname = chapter2documentname;
	}


	public String getChapter3name() {
		return chapter3name;
	}


	public void setChapter3name(String chapter3name) {
		this.chapter3name = chapter3name;
	}


	public String getChapter3id() {
		return chapter3id;
	}


	public void setChapter3id(String chapter3id) {
		this.chapter3id = chapter3id;
	}


	public String getChapter3description() {
		return chapter3description;
	}


	public void setChapter3description(String chapter3description) {
		this.chapter3description = chapter3description;
	}


	public String getChapter3videourl() {
		return chapter3videourl;
	}


	public void setChapter3videourl(String chapter3videourl) {
		this.chapter3videourl = chapter3videourl;
	}


	public String getChapter3videoname() {
		return chapter3videoname;
	}


	public void setChapter3videoname(String chapter3videoname) {
		this.chapter3videoname = chapter3videoname;
	}


	public String getChapter3documenturl() {
		return chapter3documenturl;
	}


	public void setChapter3documenturl(String chapter3documenturl) {
		this.chapter3documenturl = chapter3documenturl;
	}


	public String getChapter3documentname() {
		return chapter3documentname;
	}


	public void setChapter3documentname(String chapter3documentname) {
		this.chapter3documentname = chapter3documentname;
	}


	public String getChapter4name() {
		return chapter4name;
	}


	public void setChapter4name(String chapter4name) {
		this.chapter4name = chapter4name;
	}


	public String getChapter4id() {
		return chapter4id;
	}


	public void setChapter4id(String chapter4id) {
		this.chapter4id = chapter4id;
	}


	public String getChapter4description() {
		return chapter4description;
	}


	public void setChapter4description(String chapter4description) {
		this.chapter4description = chapter4description;
	}


	public String getChapter4videourl() {
		return chapter4videourl;
	}


	public void setChapter4videourl(String chapter4videourl) {
		this.chapter4videourl = chapter4videourl;
	}


	public String getChapter4videoname() {
		return chapter4videoname;
	}


	public void setChapter4videoname(String chapter4videoname) {
		this.chapter4videoname = chapter4videoname;
	}


	public String getChapter4documenturl() {
		return chapter4documenturl;
	}


	public void setChapter4documenturl(String chapter4documenturl) {
		this.chapter4documenturl = chapter4documenturl;
	}


	public String getChapter4documentname() {
		return chapter4documentname;
	}


	public void setChapter4documentname(String chapter4documentname) {
		this.chapter4documentname = chapter4documentname;
	}


	public String getChapter5name() {
		return chapter5name;
	}


	public void setChapter5name(String chapter5name) {
		this.chapter5name = chapter5name;
	}


	public String getChapter5id() {
		return chapter5id;
	}


	public void setChapter5id(String chapter5id) {
		this.chapter5id = chapter5id;
	}


	public String getChapter5description() {
		return chapter5description;
	}


	public void setChapter5description(String chapter5description) {
		this.chapter5description = chapter5description;
	}


	public String getChapter5videourl() {
		return chapter5videourl;
	}


	public void setChapter5videourl(String chapter5videourl) {
		this.chapter5videourl = chapter5videourl;
	}


	public String getChapter5videoname() {
		return chapter5videoname;
	}


	public void setChapter5videoname(String chapter5videoname) {
		this.chapter5videoname = chapter5videoname;
	}


	public String getChapter5documenturl() {
		return chapter5documenturl;
	}


	public void setChapter5documenturl(String chapter5documenturl) {
		this.chapter5documenturl = chapter5documenturl;
	}


	public String getChapter5documentname() {
		return chapter5documentname;
	}


	public void setChapter5documentname(String chapter5documentname) {
		this.chapter5documentname = chapter5documentname;
	}
	

}


   