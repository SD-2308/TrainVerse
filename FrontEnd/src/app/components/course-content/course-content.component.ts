import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../service/professor.service';
import { UserService } from '../../service/user.service';
import { Chapter } from '../../models/chapter';

@Component({
  selector: 'app-course-content',
  standalone: false,
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer?: ElementRef;
  @ViewChild('videoSection') videoSection?: ElementRef;  // Reference to video section
  selectedVideo: any = null;

  course: Course = new Course();
  chapterlist: any[] = []; // Will store chapters dynamically
  loggedUser: string = '';
  currRole: string = '';
  notes: { text: string }[] = []; // Array to store notes

  completedChapters: Set<number> = new Set(); // Track completed chapters

  constructor(
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      // Fetch chapters
      this.userService.getChapterListByCourseId(courseId).subscribe(
        (data: Chapter[]) => {
          if (data.length > 0) {
            this.chapterlist = this.extractChapters(data[0]);
          }
        },
        (error) => {
          console.error('Error fetching chapter list:', error);
        }
      );
    }

    if (id) {
      this.professorService.getCourseById(id).subscribe(
        (course: Course) => {
          this.course = course;
        },
        (error) => {
          console.error('Failed to load course:', error);
        }
      );
    }

    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    const savedNotes = localStorage.getItem('courseNotes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }

  // Method to generate stars for course rating
  getStars(rating: string | number): string[] {
    const stars = parseFloat(rating as string);
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('full'),
      ...(halfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }

  extractChapters(rawChapter: Chapter): any[] {
      const chapters = [];
  
      for (let i = 1; i <= 5; i++) {
        const name = (rawChapter as any)[`chapter${i}name`];
        if (name && name.trim() !== '') {
          chapters.push({
            id: (rawChapter as any)[`chapter${i}id`],
            name: name,
            description: (rawChapter as any)[`chapter${i}description`],
            videoName: (rawChapter as any)[`chapter${i}videoname`],
            documentName: (rawChapter as any)[`chapter${i}documentname`],
            videoUrl: (rawChapter as any)[`chapter${i}videourl`] || `assets/videos/chapter${i}.mp4`, // Default URL if not provided
            documentUrl: (rawChapter as any)[`chapter${i}documenturl`] || `assets/documents/chapter${i}.pdf`, // Default URL if not provided
            isCompleted: false // To track completion status
          });
        }
      }
  
      return chapters;
  }

  // New methods for video playback
  playVideo(chapter: any): void {
    // Set the selected video
    this.selectedVideo = {
      name: chapter.videoName,
      url: chapter.videoUrl || `assets/videos/${chapter.id}.mp4`, // Fallback URL if not provided
      description: chapter.description
    };

    console.log(chapter.videoUrl);

    // Smooth scroll to the video section after setting the video
    setTimeout(() => {
      this.scrollToVideo();
    }, 0);

    // Play the video automatically after a small delay to ensure DOM is updated
    setTimeout(() => {
      if (this.videoPlayer && this.videoPlayer.nativeElement) {
        this.videoPlayer.nativeElement.play();
      }
    }, 100);
  }

  // Scroll to video section smoothly
  scrollToVideo() {
    if (this.videoSection) {
      this.videoSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Event handler for when the video ends
  onVideoEnd(chapterId: number): void {
    // Mark the chapter as completed
    this.completedChapters.add(chapterId);
    
    // Optionally, you can show a message or enable the next chapter button here.
    console.log(`Chapter ${chapterId} completed!`);
  }

  downloadDocument(chapter: any): void {
    // Implementation for document download
    const documentUrl = chapter.documentUrl || `assets/documents/${chapter.id}.pdf`;
    
    // Open in new tab or download
    window.open(documentUrl, '_blank');
  }

  closeVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
    this.selectedVideo = null;
  }

  // Method to check if the current chapter is completed
  isChapterCompleted(chapterId: number): boolean {
    return this.completedChapters.has(chapterId);
  }

  // Method to add a note
  addNote(): void {
    const noteInput = (document.getElementById('noteInput') as HTMLTextAreaElement).value;
    
    if (noteInput.trim()) {
      this.notes.push({ text: noteInput.trim() });
      
      // Save notes to localStorage
      localStorage.setItem('courseNotes', JSON.stringify(this.notes));

      // Clear the textarea after adding
      (document.getElementById('noteInput') as HTMLTextAreaElement).value = '';
    }
  }

  // Method to delete a note
  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    
    // Save updated notes to localStorage
    localStorage.setItem('courseNotes', JSON.stringify(this.notes));
  }
}
