package com.application.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import com.application.model.Chapter;

public interface ChapterRepository extends CrudRepository<Chapter, Integer>
{
	public List<Chapter> findByCoursename(String Coursename);

	
	
	public List<Chapter> findByCourseid(String courseid);
	
	
	@Query("SELECT c FROM Chapter c WHERE c.courseid = :courseid")
    public Chapter findByChapterid(@Param("courseid") String courseid);
}