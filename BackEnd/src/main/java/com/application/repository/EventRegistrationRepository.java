package com.application.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.application.model.EventRegistration;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {

	public EventRegistration findByEmailAndEventTitle(String email, String eventTitle);

	public List<EventRegistration> findByName(String name);

	public List<EventRegistration> findByEmail(String email);


	}