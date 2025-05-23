package com.application.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.application.model.Events;

public interface EventRepository extends JpaRepository<Events, Long> {

	boolean deleteEventById(Long id);

	
	
}
