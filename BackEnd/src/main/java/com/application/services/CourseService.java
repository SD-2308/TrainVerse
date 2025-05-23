package com.application.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.application.model.Course;
import com.application.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CourseService 
{
	@Autowired
	private CourseRepository courseRepo;
	
	public Course saveCourse(Course course)
	{
		return courseRepo.save(course);
	}
	
	public Course addNewCourse(Course course)
	{
		return courseRepo.save(course);
	}
	
	public List<Course> getAllCourses()
	{
		return (List<Course>)courseRepo.findAll();
	}
	
	public void updateEnrolledcount(String coursename, int enrolledcount)
	{
		courseRepo.updateEnrolledcount(enrolledcount, coursename);
	}
	
	public Course fetchCourseByCoursename(String coursename)
	{
		return courseRepo.findByCoursename(coursename);
	}
	
	public Course fetchCourseByCourseid(String courseid)
	{
		return courseRepo.findByCourseid(courseid);
	}
	
	public List<Course> fetchByInstructorname(String instructorname)
	{
		return (List<Course>)courseRepo.findByInstructorname(instructorname);
	}
	
	public List<Course> fetchByInstructorinstitution(String instructorinstitution)
	{
		return (List<Course>)courseRepo.findByInstructorinstitution(instructorinstitution);
	}
	
	public List<Course> fetchByEnrolleddate(String enrolleddate)
	{
		return (List<Course>)courseRepo.findByEnrolleddate(enrolleddate);
	}
	
	public List<Course> fetchByCoursetype(String coursetype)
	{
		return (List<Course>)courseRepo.findByCoursetype(coursetype);
	}
	
	public List<Course> fetchByYoutubeurl(String youtubeurl)
	{
		return (List<Course>)courseRepo.findByYoutubeurl(youtubeurl);
	}
	
	public List<Course> fetchByWebsiteurl(String websiteurl)
	{
		return (List<Course>)courseRepo.findByWebsiteurl(websiteurl);
	}
	
	public List<Course> fetchBySkilllevel(String skilllevel)
	{
		return (List<Course>)courseRepo.findBySkilllevel(skilllevel);
	}
	
	public List<Course> fetchByLanguage(String language)
	{
		return (List<Course>)courseRepo.findByLanguage(language);
	}

	public List<Course> getAllCourse() {
		
		return (List<Course>) courseRepo.findAll();
	}

	public Course getCourseById(String courseid) {
		return courseRepo.findByCourseid(courseid);
	}

	 public Course updateCourse(String courseid, Course updatedCourse) {
	        Course course = courseRepo.findByCourseid(courseid);

	        if (course == null) {
	            return null;
	        }

	        course.setCoursename(updatedCourse.getCoursename());
	        course.setInstructorname(updatedCourse.getInstructorname());
	        course.setInstructorinstitution(updatedCourse.getInstructorinstitution());
	        course.setYoutubeurl(updatedCourse.getYoutubeurl());
	        course.setWebsiteurl(updatedCourse.getWebsiteurl());
	        course.setCoursetype(updatedCourse.getCoursetype());
	        course.setSkilllevel(updatedCourse.getSkilllevel());
	        course.setLanguage(updatedCourse.getLanguage());
	        course.setDescription(updatedCourse.getDescription());
	        course.setPrice(updatedCourse.getPrice());
	        course.setRating(updatedCourse.getRating());
	        course.setAbout(updatedCourse.getAbout());
	        course.setFaq1Question(updatedCourse.getFaq1Question());
	        course.setFaq1Answer(updatedCourse.getFaq1Answer());
	        course.setFaq2Question(updatedCourse.getFaq2Question());
	        course.setFaq2Answer(updatedCourse.getFaq2Answer());
	        course.setFaq3Question(updatedCourse.getFaq3Question());
	        course.setFaq3Answer(updatedCourse.getFaq3Answer());
	        course.setDuration(updatedCourse.getDuration());
	        course.setImageUrl(updatedCourse.getImageUrl());
	        course.setDepartment(updatedCourse.getDepartment());
	        course.setEnrolleddate(updatedCourse.getEnrolleddate());
	        course.setEnrolledcount(updatedCourse.getEnrolledcount());

	        return courseRepo.save(course);
	    }

	 private static final Logger logger = LoggerFactory.getLogger(CourseService.class);
	    
	    public boolean deleteCourse(String courseid, String password) {
	        final String ADMIN_PASSWORD = "Admin@123"; // Ideally, store this in an environment variable or config file

	        // Check if password matches
	        if (!ADMIN_PASSWORD.equals(password)) {
	            logger.warn("Password mismatch for course deletion attempt. Course ID: {}", courseid);
	            return false; // Password check failed
	        }

	        try {
	            // Check if the course exists
	            Course course = courseRepo.findByCourseid(courseid);
	            if (course != null) {
	                courseRepo.delete(course); // Delete course
	                logger.info("Course deleted successfully. Course ID: {}", courseid);
	                return true;
	            } else {
	                logger.warn("Course not found. Course ID: {}", courseid);
	                return false; // Course not found
	            }
	        } catch (Exception e) {
	            logger.error("Error occurred while deleting course. Course ID: {}", courseid, e);
	            return false; // Handle unexpected errors
	        }
	    }





	
}