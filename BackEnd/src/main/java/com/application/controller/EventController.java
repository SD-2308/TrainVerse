package com.application.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.application.services.ProfessorService;
import com.application.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.application.model.EventRegistration;
import com.application.model.Events;
import com.application.model.Professor;
import com.application.model.User;
import com.application.repository.EventRegistrationRepository;
import com.application.services.EventService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    private final ProfessorService professorService;

    private final UserService userService;
    

    @Autowired
    private EventService eventService;
    
    
    @Autowired
    private EventRegistrationRepository repository;

    EventController(UserService userService, ProfessorService professorService) {
        this.userService = userService;
        this.professorService = professorService;
    }

    @PostMapping("/addevent")
    public Events addEvent(@RequestBody Events event) {
        return eventService.saveEvent(event);
    }

    @GetMapping("/events")
    public List<Events> getAllEvents() {
        return eventService.getAllEvents();
    }
    
 // API to update an existing event
    @PutMapping("/updateevent/{id}")
    public Events updateEvent(@PathVariable("id") Long id, @RequestBody Events event) {
        // Fetch the event to be updated from the database using the ID
        Events existingEvent = eventService.getEventById(id);
        
        if (existingEvent == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }

        // Update the existing event details with the new data
        existingEvent.setTitle(event.getTitle());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setDate(event.getDate());
        existingEvent.setImageUrl(event.getImageUrl());
        existingEvent.setSpeaker(event.getSpeaker());
        existingEvent.setTiming(event.getTiming());
        existingEvent.setMeetingUrl(event.getMeetingUrl());

        // Save the updated event and return the updated event
        return eventService.saveEvent(existingEvent);
    }
    
    @GetMapping("/events/{id}")
    public Events getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }
    
    @GetMapping("/userRegistrations/{email}")
    public List<EventRegistration> getRegistrationsByEmail(@PathVariable String email) {
        return repository.findByEmail(email);
    }

    
    @DeleteMapping("/deleteevent/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        boolean deleted = eventService.deleteEventById(id);
        if (deleted) {
            return ResponseEntity.ok("Event deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
        }
    }





    @PostMapping("/eventregister")
    public EventRegistration register(@RequestBody EventRegistration registration) {
        return repository.save(registration);
    }
    
    
    @GetMapping("/checkRegistration")
    public ResponseEntity<Map<String, Object>> checkRegistration(@RequestParam String email, @RequestParam String eventTitle) {
        boolean alreadyRegistered = eventService.isUserRegisteredForEvent(email, eventTitle);
        
        // Creating the response map
        Map<String, Object> response = new HashMap<>();
        response.put("alreadyRegistered", alreadyRegistered);
        
        // Return the response
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/geteventenrollmentbyemail/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<EventRegistration>> getEventEnrollmentByEmail(@PathVariable String email, @PathVariable String role) throws Exception
	{
		User userObj;
		Professor professorObj;
		String enrolledUser = "";
		if(role.equalsIgnoreCase("user"))
		{
		    userObj = userService.fetchUserByEmail(email);
		    enrolledUser = userObj.getEmail();
		}
		else if(role.equalsIgnoreCase("professor"))
		{
		    professorObj = professorService.fetchProfessorByEmail(email);
		    enrolledUser = professorObj.getProfessorname();
		}
		
		List<EventRegistration> enrollments = eventService.fetchByEmail(enrolledUser);
		return new ResponseEntity<List<EventRegistration>>(enrollments, HttpStatus.OK);
	}

}
