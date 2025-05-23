package com.application.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.application.model.Chapter;
import com.application.model.Course;
import com.application.model.Professor;
import com.application.model.Wishlist;
import com.application.repository.CourseRepository;
import com.application.repository.ProfessorRepository;
import com.application.services.ChapterService;
import com.application.services.CourseService;
import com.application.services.ProfessorService;
import com.application.services.WishlistService;


@RestController
public class ProfessorController 
{	
	@Autowired
	private ProfessorService professorService;
	
	@Autowired
	private CourseService courseService;
	
	@Autowired
	private ChapterService chapterService;
	
	@Autowired
	private WishlistService wishlistService;
	
	
	@Autowired
	private CourseRepository courseRepository;
	
	//added by SD
	@Autowired
	private ProfessorRepository professorRepository;

	
	// http://localhost:8080/getCourseById/{id}
	@GetMapping("/getCourseById/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
    public Course getCourseById(@PathVariable("id") String courseid){
    	return courseService.getCourseById(courseid);
}
	
	
	
    @GetMapping("/getAllCourse")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Course> getAllCourse(){
    	return courseService.getAllCourse();
    	
    }
	
	
	@GetMapping("/professorlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Professor>> getProfessorList() throws Exception
	{
		List<Professor> professors = professorService.getAllProfessors();
		return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
	}
	
	@GetMapping("/youtubecourselist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Course>> getYoutubeCourseList() throws Exception
	{
		List<Course> youtubeCourseList = courseService.fetchByCoursetype("Youtube");
//		for(Course list:youtubeCourseList)
//		{
//			System.out.println(list.getYoutubeurl());
//		}
		return new ResponseEntity<List<Course>>(youtubeCourseList, HttpStatus.OK);
	}
	
	@GetMapping("/websitecourselist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Course>> getWebsiteCourseList() throws Exception
	{
		List<Course> websiteCourseList = courseService.fetchByCoursetype("Website");
		return new ResponseEntity<List<Course>>(websiteCourseList, HttpStatus.OK);
	}
	
	@GetMapping("/courselistbyname/{coursename}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Course>> getCourseListByName(@PathVariable String coursename) throws Exception
	{
		Course courseList = courseService.fetchCourseByCoursename(coursename);
		System.out.println(courseList.getCoursename()+" ");
		List<Course> courselist = new ArrayList<>();
		courselist.add(courseList);
		return new ResponseEntity<List<Course>>(courselist, HttpStatus.OK);
	}
	
	@GetMapping("/professorlistbyemail/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Professor>> getProfessorListByEmail(@PathVariable String email) throws Exception
	{
		List<Professor> professors = professorService.getProfessorsByEmail(email);
		return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
	}
	
	@PostMapping("/addProfessor")
	@CrossOrigin(origins = "http://localhost:4200")
	public Professor addNewProfessor(@RequestBody Professor professor) throws Exception
	{
		Professor professorObj = null;
		String newID = getNewID();
		professor.setProfessorid(newID);
		professorObj = professorService.addNewProfessor(professor);
		professorService.updateStatus(professor.getEmail());
		return professorObj;
	}
	
	@DeleteMapping("/by-courseid/{courseid}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<String> deleteCourse(@PathVariable String courseid, @RequestParam String password) {
	    boolean deleted = courseService.deleteCourse(courseid, password);
	    if (deleted) {
	        return ResponseEntity.ok("Course deleted successfully.");
	    } else {
	        return ResponseEntity.status(403).body("Invalid password or course not found.");
	    }
	}

	
	@PostMapping("/addCourse")
	@CrossOrigin(origins = "http://localhost:4200")
	public Course addNewCourse(@RequestBody Course course) throws Exception
	{
		Course courseObj = null;
		String newID = getNewID();
		course.setCourseid(newID);
		
		courseObj = courseService.addNewCourse(course);
		return courseObj;
	}
	
	@PostMapping("/addnewchapter")
	@CrossOrigin(origins = "http://localhost:4200")
	public Chapter addNewChapters(@RequestBody Chapter chapter) throws Exception
	{
		Chapter chapterObj = null;
		chapterObj = chapterService.addNewChapter(chapter);
		return chapterObj;
	}
	
	@GetMapping("/acceptstatus/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<String>> updateStatus(@PathVariable String email) throws Exception
	{
		professorService.updateStatus(email);
		List<String> al=new ArrayList<>();
		al.add("accepted");
		return new ResponseEntity<List<String>>(al,HttpStatus.OK);
	}
	
	@GetMapping("/rejectstatus/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<String>> rejectStatus(@PathVariable String email) throws Exception
	{
		professorService.rejectStatus(email);
		List<String> al=new ArrayList<>();
		al.add("rejected");
		return new ResponseEntity<List<String>>(al,HttpStatus.OK);
	}
	
	@GetMapping("/professorprofileDetails/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Professor>> getProfileDetails(@PathVariable String email) throws Exception
	{
		List<Professor> professors = professorService.fetchProfileByEmail(email);
		return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
	}
	
	@PutMapping("/updateprofessor")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Professor> updateProfessorProfile(@RequestBody Professor professor) throws Exception
	{
		Professor professorobj = professorService.updateProfessorProfile(professor);
		return new ResponseEntity<Professor>(professorobj, HttpStatus.OK);
	}
	
	@GetMapping("/gettotalprofessors")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalProfessors() throws Exception
	{
		List<Professor> professors = professorService.getAllProfessors();
		List<Integer> professorsCount = new ArrayList<>();
		professorsCount.add(professors.size());
		return new ResponseEntity<List<Integer>>(professorsCount, HttpStatus.OK);
	}
	
	@GetMapping("/gettotalchapters")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalChapters() throws Exception
	{
		List<Chapter> chapters = chapterService.getAllChapters();
		List<Integer> chaptersCount = new ArrayList<>();
		chaptersCount.add(chapters.size());
		return new ResponseEntity<List<Integer>>(chaptersCount, HttpStatus.OK);
	}
	
	@GetMapping("/gettotalcourses")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalCourses() throws Exception
	{
		List<Course> courses = courseService.getAllCourses();
		List<Integer> coursesCount = new ArrayList<>();
		coursesCount.add(courses.size());
		return new ResponseEntity<List<Integer>>(coursesCount, HttpStatus.OK);
	}
	
	@GetMapping("/gettotalwishlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalWishlist() throws Exception
	{
		List<Wishlist> wishlists = wishlistService.getAllLikedCourses();
		List<Integer> wishlistCount = new ArrayList<>();
		wishlistCount.add(wishlists.size());
		return new ResponseEntity<List<Integer>>(wishlistCount, HttpStatus.OK);
	}
	
	// http://localhost:4200/update/
	@PutMapping("/update/{courseid}")
	@CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> updateCourse(@PathVariable String courseid, @RequestBody Course updatedCourse) {
        Course updated = courseService.updateCourse(courseid, updatedCourse);

        if (updated != null) {
            // Return a JSON response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Course updated successfully");
            response.put("status", "success");
            return ResponseEntity.ok(response); // Return as JSON
        } else {
            // Return error as JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "Course ID not found");
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }
	
	@GetMapping("/chapters")
	@CrossOrigin(origins = "http://localhost:4200")
    public List<Chapter> getAllChapters() {
        return chapterService.getAllChapters();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public Chapter getChapterById(@PathVariable int id) {
        return chapterService.getChapterById(id)
            .orElseThrow(() -> new RuntimeException("Chapter not found with ID: " + id));
    }

    @GetMapping("/course/{courseid}")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Chapter> getChapterByCourseId(@PathVariable String courseid) {
    	List<Chapter> chapter = chapterService.getChapterByCourseId(courseid);
        if (chapter == null) {
            throw new RuntimeException("Chapter not found for course ID: " + courseid);
        }
        return chapter;
    }
    
    // http://localhost:4200/update/
 	@PutMapping("/updatechapters/{courseid}")
 	@CrossOrigin(origins = "http://localhost:4200")
     public ResponseEntity<?> updateChapters(@PathVariable String courseid, @RequestBody Chapter updatedChapter) {
        Chapter updated = chapterService.updateChapter(courseid, updatedChapter);

         if (updated != null) {
             // Return a JSON response
             Map<String, String> response = new HashMap<>();
             response.put("message", "Course updated successfully");
             response.put("status", "success");
             return ResponseEntity.ok(response); // Return as JSON
         } else {
             // Return error as JSON
             Map<String, String> response = new HashMap<>();
             response.put("message", "Course ID not found");
             response.put("status", "error");
             return ResponseEntity.badRequest().body(response);
         }
     }

	

  
	@GetMapping("/getcoursenames")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<String>> getCourseNames() throws Exception
	{
		List<Course> courses = courseService.getAllCourses();
		List<String> coursenames = new ArrayList<>();
		for(Course obj : courses)
		{
			coursenames.add(obj.getCoursename());
		}
		return new ResponseEntity<List<String>>(coursenames, HttpStatus.OK);
	}
	
	public String getNewID()
	{
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"0123456789"+"abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) 
        {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
	}
	
	
	//added by SD
		//http://localhost:8080/updateProfessor/{id}
		@PutMapping("/updateProfessor/{id}")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<Professor> updateProfessor(@PathVariable("id") String professorId,
		                                                 @RequestBody Professor updatedProfessor) {
		    Professor existingProfessor = professorRepository.findByProfessorid(professorId);
		    if (existingProfessor == null) {
		        return ResponseEntity.notFound().build();
		    }

		    // Update only editable fields
		    existingProfessor.setEmail(updatedProfessor.getEmail());
		    existingProfessor.setProfessorname(updatedProfessor.getProfessorname());
		    existingProfessor.setDegreecompleted(updatedProfessor.getDegreecompleted());
		    existingProfessor.setInstitutionname(updatedProfessor.getInstitutionname());
		    existingProfessor.setDepartment(updatedProfessor.getDepartment());
		    existingProfessor.setExperience(updatedProfessor.getExperience());
		    existingProfessor.setMobile(updatedProfessor.getMobile());
		    existingProfessor.setGender(updatedProfessor.getGender());
		    existingProfessor.setPassword(updatedProfessor.getPassword());
		    // Don't update status

		    Professor saved = professorRepository.save(existingProfessor);
		    return ResponseEntity.ok(saved);
		}
		
		//added by SD
		@GetMapping("/getProfessorById/{id}")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<Professor> getProfessorById(@PathVariable("id") String professorid) {
		    // Fetch professor from the database using the professorRepository
		    Professor professor = professorRepository.findByProfessorid(professorid); // Use findByProfessorid

		    if (professor == null) {
		        throw new RuntimeException("Professor not found with ID: " + professorid);
		    }

		    // Return the professor details as a response
		    return ResponseEntity.ok(professor);
		}
		
		
		//added by SD
		@DeleteMapping("/deleteProfessorById/{id}")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<String> deleteProfessorById(@PathVariable("id") String professorid) {
		    Professor prof = professorRepository.findByProfessorid(professorid); // custom method

		    if (prof != null) {
		        professorRepository.delete(prof); // delete the whole object
		        return ResponseEntity.ok("Professor deleted successfully");
		    } else {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professor not found");
		    }
		}
		
		@DeleteMapping("/deleteCourseById/{id}")
		@CrossOrigin(origins = "http://localhost:4200")
		public ResponseEntity<String> deleteCourseById(@PathVariable("id") String courseid) {
		    Course course = courseRepository.findByCourseid(courseid);
		    if (course != null) {
		        courseRepository.delete(course);
		        return ResponseEntity.ok("Course deleted successfully");
		    } else {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
		    }
		}

}
