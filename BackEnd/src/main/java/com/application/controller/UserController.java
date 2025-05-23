package com.application.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
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
import org.springframework.web.bind.annotation.RestController;

import com.application.model.Chapter;
import com.application.model.Enrollment;
import com.application.model.Professor;
import com.application.model.User;
import com.application.model.Wishlist;
import com.application.repository.UserRepository;
import com.application.services.ChapterService;
import com.application.services.CourseService;
import com.application.services.EnrollmentService;
import com.application.services.ProfessorService;
import com.application.services.UserService;
import com.application.services.WishlistService;

@RestController
public class UserController 
{
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProfessorService professorService;
	
	@Autowired
	private CourseService courseService;
	
	@Autowired
	private EnrollmentService enrollmentService;
	
	@Autowired
	private WishlistService wishlistService;
	
	@Autowired
	private ChapterService chapterService;
	
	//added by SD
	@Autowired
    private UserRepository userRepository;
	
	@GetMapping("/userlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<User>> getUsers() throws Exception
	{
		List<User> users = userService.getAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
	@PostMapping("/enrollnewcourse/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public String enrollNewCourse(@RequestBody Enrollment enrollment, @PathVariable String email, @PathVariable String role) throws Exception
	{
		String enrolledUserName = "",enrolledUserID = "";
		
		if(role.equalsIgnoreCase("user"))
		{
		    List<User> users = userService.getAllUsers();
		    for(User userObj:users)
		    {
			    if(userObj.getEmail().equalsIgnoreCase(email))
			    {
				    enrolledUserName = userObj.getUsername();
				    enrolledUserID = userObj.getUserid();
				    enrollment.setEnrolleduserid(enrolledUserID);
				    enrollment.setEnrolledusername(enrolledUserName);
				    break;
			    }
		    }
		}
		else if(role.equalsIgnoreCase("professor"))
		{
		    List<Professor> professors = professorService.getAllProfessors();
		    for(Professor professorObj:professors)
		    {
			    if(professorObj.getEmail().equalsIgnoreCase(email))
			    {
				    enrolledUserName = professorObj.getProfessorname();
				    enrolledUserID = professorObj.getProfessorid();
				    enrollment.setEnrolleduserid(enrolledUserID);
				    enrollment.setEnrolledusername(enrolledUserName);
				    break;
			    }
		    }
		}
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");  
        Date date = new Date();  
        String todayDate = formatter.format(date);
        enrollment.setEnrolleddate(todayDate);
         	
		Enrollment enrollmentObj = null;
		enrollmentObj = enrollmentService.saveEnrollment(enrollment);
		System.out.println(enrollmentObj);
		
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		Map<String, Integer> enrolledCount = new LinkedHashMap<>();
		for(Enrollment enrollObj : enrollments)
		{
			String courseName = enrollObj.getCoursename();
			if(enrolledCount.containsKey(courseName))
			enrolledCount.put(courseName, enrolledCount.get(courseName)+1);
			else
			enrolledCount.put(courseName, 1);
		}
		for(Map.Entry<String, Integer> obj : enrolledCount.entrySet())
		{
			if(obj.getKey().equalsIgnoreCase(enrollment.getCoursename()))
			{
			    enrollmentService.updateEnrolledcount(obj.getKey(), obj.getValue());
			    courseService.updateEnrolledcount(obj.getKey(), obj.getValue());
			}
		}
		
		return "done";
	}
	
	@GetMapping("/getenrollmentstatus/{coursename}/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Set<String>> getEnrollmentStatus(@PathVariable String coursename, @PathVariable String email, @PathVariable String role) throws Exception
	{
		List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		User userObj;
		Professor professorObj;
		String enrolledUser = "";
		if(role.equalsIgnoreCase("user"))
		{
		    userObj = userService.fetchUserByEmail(email);
		    enrolledUser = userObj.getUsername();
		}
		else if(role.equalsIgnoreCase("professor"))
		{
		    professorObj = professorService.fetchProfessorByEmail(email);
		    enrolledUser = professorObj.getProfessorname();
		}
		
		Set<String> enrollmentStatus = new LinkedHashSet<>();
		int flag = 0;
		OUTER:for(Enrollment enrollmentObj : enrollments)
		{
			if(enrollmentObj.getCoursename().equalsIgnoreCase(coursename) && enrollmentObj.getEnrolledusername().equalsIgnoreCase(enrolledUser))
			{
				enrollmentStatus.add("enrolled");
				flag = 1;
				break OUTER;
			}
		}
		if(flag == 0)
		enrollmentStatus.add("notenrolled");
		return new ResponseEntity<Set<String>>(enrollmentStatus, HttpStatus.OK);
	}
	
	@PostMapping("/addtowishlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Wishlist> addNewCourse(@RequestBody Wishlist wishlist) throws Exception
	{
		Wishlist wishlistObj = null;
		wishlistObj = wishlistService.addToWishlist(wishlist);
		return new ResponseEntity<Wishlist>(wishlistObj, HttpStatus.OK);
	}
	
	@GetMapping("/getwishliststatus/{coursename}/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Set<String>> getWishlistStatus(@PathVariable String coursename, @PathVariable String email) throws Exception
	{
		List<Wishlist> wishlists = wishlistService.getAllLikedCourses();
		Set<String> wishlistsStatus = new LinkedHashSet<>();
		int flag = 0;
		OUTER:for(Wishlist wishlistsObj : wishlists)
		{
			if(wishlistsObj.getCoursename().equalsIgnoreCase(coursename) && wishlistsObj.getLikeduser().equalsIgnoreCase(email))
			{
				wishlistsStatus.add("liked");
				flag = 1;
				break OUTER;
			}
		}
		if(flag == 0)
		wishlistsStatus.add("notliked");
		return new ResponseEntity<Set<String>>(wishlistsStatus, HttpStatus.OK);
	}
	
	@GetMapping("/getallwishlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Wishlist>> getAllWislist() throws Exception
	{
		List<Wishlist> Wishlists = wishlistService.getAllLikedCourses();
		return new ResponseEntity<List<Wishlist>>(Wishlists, HttpStatus.OK);
	}
	
	@GetMapping("/getwishlistbyemail/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Wishlist>> getWishlistByEmail(@PathVariable String email) throws Exception
	{
		List<Wishlist> Wishlists = wishlistService.fetchByLikeduser(email);
		return new ResponseEntity<List<Wishlist>>(Wishlists, HttpStatus.OK);
	}
	
	@GetMapping("/getenrollmentbyemail/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Enrollment>> getEnrollmentsByEmail(@PathVariable String email, @PathVariable String role) throws Exception
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
		
		List<Enrollment> enrollments = enrollmentService.fetchByEnrolledusername(enrolledUser);
		return new ResponseEntity<List<Enrollment>>(enrollments, HttpStatus.OK);
	}
	
	@GetMapping("/getchapterlistbycoursename/{coursename}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Chapter>> getChapterListByCoursename(@PathVariable String coursename) throws Exception
	{
		List<Chapter> chapterLists = chapterService.fetchByCoursename(coursename);
		if(chapterLists.size()==0)
		{
			Chapter obj1 = new Chapter();
			obj1.setChapter1name("");
			obj1.setChapter2name("");
			obj1.setChapter3name("");
			obj1.setChapter4name("");
			obj1.setChapter5name("");
			chapterLists.add(obj1);
		}
		return new ResponseEntity<List<Chapter>>(chapterLists, HttpStatus.OK);
	}
	
	@GetMapping("/getchapterlistbycourseid/{courseid}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Chapter>> getChapterListByCourseid(@PathVariable String courseid) throws Exception
	{
		List<Chapter> chapterLists = chapterService.fetchByCourseid(courseid);
		if(chapterLists.size()==0)
		{
			Chapter obj1 = new Chapter();
			obj1.setChapter1name("");
			obj1.setChapter2name("");
			obj1.setChapter3name("");
			obj1.setChapter4name("");
			obj1.setChapter5name("");

			chapterLists.add(obj1);
		}
		return new ResponseEntity<List<Chapter>>(chapterLists, HttpStatus.OK);
	}
	
	@GetMapping("/userprofileDetails/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<User>> getProfileDetails(@PathVariable String email) throws Exception
	{
		List<User> users = userService.fetchProfileByEmail(email);
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
	
	@PutMapping("/updateuser")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<User> updateUserProfile(@RequestBody User user) throws Exception
	{
		User userobj = userService.updateUserProfile(user);
		return new ResponseEntity<User>(userobj, HttpStatus.OK);
	}
	
	@GetMapping("/gettotalusers")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalUsers() throws Exception
	{
		List<User> users = userService.getAllUsers();
		List<Integer> usersCount = new ArrayList<>();
		usersCount.add(users.size());
		return new ResponseEntity<List<Integer>>(usersCount, HttpStatus.OK);
	}
	
	@GetMapping("/gettotalenrollmentcount")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalEnrollmentcount() throws Exception {
	    List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
	    int count = 0;
	    for (Enrollment enrollmentObj : enrollments) {
	        String enrolledCountStr = enrollmentObj.getEnrolledcount();
	        if (enrolledCountStr != null && !enrolledCountStr.isEmpty()) {
	            try {
	                count += Integer.parseInt(enrolledCountStr);
	            } catch (NumberFormatException e) {
	                // Log the error and skip this entry
	                System.out.println("Invalid number format: " + enrolledCountStr);
	            }
	        }
	    }
	    List<Integer> enrollmentsCount = new ArrayList<>();
	    enrollmentsCount.add(count);
	    return new ResponseEntity<>(enrollmentsCount, HttpStatus.OK);
	}

	
	@GetMapping("/gettotalenrollments")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalEnrollments() throws Exception
	{
		List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		List<Integer> enrollmentsCount = new ArrayList<>();
		enrollmentsCount.add(enrollments.size());
		return new ResponseEntity<List<Integer>>(enrollmentsCount, HttpStatus.OK);
	}
	
	@GetMapping("/check/{courseid}/{userid}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
    public String checkEnrollmentStatus(@PathVariable String courseid,
                                        @PathVariable String userid,
                                        @PathVariable String role) {
        boolean isEnrolled = enrollmentService.checkEnrollment(courseid, userid, role).isPresent();
        return isEnrolled ? "enrolled" : "not enrolled";
    }

    @PostMapping("/enroll/{userid}/{role}")
    @CrossOrigin(origins = "http://localhost:4200")
    public Map<String, Object> enrollCourse(@RequestBody Enrollment enrollment,
                                            @PathVariable String userid,
                                            @PathVariable String role) {
        Map<String, Object> response = new HashMap<>();

        boolean alreadyEnrolled = enrollmentService.checkEnrollment(enrollment.getCourseid(), userid, role).isPresent();
        if (alreadyEnrolled) {
            response.put("success", false);
            response.put("message", "Already enrolled in this course");
            return response;
        }

        // Auto-set enrolled date and enrolled user name if needed
        enrollment.setEnrolleduserid(userid);
        enrollment.setEnrolledusertype(role);
        
        // If enrolled date is empty, set today's date
        if (enrollment.getEnrolleddate() == null || enrollment.getEnrolleddate().isEmpty()) {
            enrollment.setEnrolleddate(LocalDate.now().toString());
        }

        enrollmentService.saveEnrollment(enrollment);
        response.put("success", true);
        response.put("message", "Enrollment successful");
        return response;
    }
    
    @GetMapping("user/{userid}")
    @CrossOrigin(origins = "http://localhost:4200")
    public User getProfileById(@PathVariable String userid) {
        return userService.getProfileById(userid);
    }
    
  //admin password check
  	@PostMapping("/verify-admin-password")
  	@CrossOrigin(origins = "http://localhost:4200")
  	public ResponseEntity<Map<String, Boolean>> verifyAdminPassword(@RequestBody Map<String, String> request) {
  	    String password = request.get("password");

  	    // 👉 Replace "Admin@123" with your actual admin password logic
  	    boolean isValid = "Admin@123".equals(password);

  	    Map<String, Boolean> response = new HashMap<>();
  	    response.put("valid", isValid);
  	    return ResponseEntity.ok(response);
  	}
  	
  	//added by SD
  	 @GetMapping("/getUserById/{id}")
  	 @CrossOrigin(origins = "http://localhost:4200")
  	    public ResponseEntity<User> getUserById(@PathVariable("id") String userid) {
  	        User user = userRepository.findByUserid(userid);
  	        if (user == null) {
  	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
  	        }
  	        return ResponseEntity.ok(user);
  	    }

  	    // 👉 Delete User by userid
  	    @DeleteMapping("/deleteUserById/{id}")
  	    @CrossOrigin(origins = "http://localhost:4200")
  	    public ResponseEntity<String> deleteUserById(@PathVariable("id") String userid) {
  	        User user = userRepository.findByUserid(userid);
  	        if (user != null) {
  	            userRepository.delete(user);
  	            return ResponseEntity.ok("User deleted successfully");
  	        } else {
  	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
  	        }
  	    }
  	    
  	    @GetMapping("/getAllUsers")
  	    @CrossOrigin(origins = "http://localhost:4200")
  	    public List<User> getAllUsers() {
  	        return (List<User>) userRepository.findAll();
  	    }



    
}
	
