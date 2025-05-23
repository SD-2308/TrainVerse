package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "event_registrations")
public class EventRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String eventTitle;
    private String date;
    private String imageUrl;
    private String speaker;
    private String description;
    private String timing;
    private String meetingUrl;
	public EventRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EventRegistration(Long id, String name, String email, String phone, String eventTitle, String date,
			String imageUrl, String speaker, String description, String timing, String meetingUrl) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.eventTitle = eventTitle;
		this.date = date;
		this.imageUrl = imageUrl;
		this.speaker = speaker;
		this.description = description;
		this.timing = timing;
		this.meetingUrl = meetingUrl;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEventTitle() {
		return eventTitle;
	}
	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getSpeaker() {
		return speaker;
	}
	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTiming() {
		return timing;
	}
	public void setTiming(String timing) {
		this.timing = timing;
	}
	public String getMeetingUrl() {
		return meetingUrl;
	}
	public void setMeetingUrl(String meetingUrl) {
		this.meetingUrl = meetingUrl;
	}
    
    
}