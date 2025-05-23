package com.application.services;


import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.application.model.EventRegistration;
import com.application.model.Events;
import com.application.repository.EventRegistrationRepository;
import com.application.repository.EventRepository;



@Service
public class EventService {

    @Autowired
    private EventRepository repository;
    
    @Autowired
    private EventRegistrationRepository registerrepository;

    public Events saveEvent(Events event) {
        return repository.save(event);
    }

    public List<Events> getAllEvents() {
        return repository.findAll();
    }

	public boolean isUserRegisteredForEvent(String email, String eventTitle) {
		 // Query to check if the user is already registered for the event
        EventRegistration existingRegistration = registerrepository
                .findByEmailAndEventTitle(email, eventTitle);
        
        return existingRegistration != null;
	}


	public List<EventRegistration> fetchByname(String name) {
	    return registerrepository.findByName(name);
	}
	
	public List<EventRegistration> fetchByEmail(String email) {
	    return registerrepository.findByEmail(email);
	}
	
	// Get an event by its ID
    public Events getEventById(Long id) {
        Optional<Events> event = repository.findById(id);
        return event.orElse(null);  // If the event is not found, return null
    }

    // Delete an event by its ID
    public void deleteEvent(Long id) {
    	repository.deleteById(id);
    }

    @Transactional
    public boolean deleteEventById(Long id) {
        Optional<Events> eventOpt = repository.findById(id);
        if (eventOpt.isPresent()) {
        	repository.deleteById(id); // This requires a transaction
            return true;
        } else {
            return false;
        }
    }

	

}
