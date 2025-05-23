package com.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.application.model.Chapter;
import com.application.repository.ChapterRepository;

@Service
public class ChapterService 
{
	@Autowired
	private ChapterRepository chapterRepo;
	
	
	public Chapter saveChapter(Chapter chapter)
	{
		return chapterRepo.save(chapter);
	}
	
	public Chapter addNewChapter(Chapter chapter)
	{
		return chapterRepo.save(chapter);
	}
	
	public List<Chapter> getAllChapters()
	{
		return (List<Chapter>)chapterRepo.findAll();
	}
	
	public List<Chapter> fetchByCoursename(String coursename)
	{
		return (List<Chapter>)chapterRepo.findByCoursename(coursename);
	}


	public List<Chapter> fetchByCourseid(String courseid)
	{
		return (List<Chapter>)chapterRepo.findByCourseid(courseid);
	}
	

    public Optional<Chapter> getChapterById(int id) {
        return chapterRepo.findById(id);
    }

    public List<Chapter> getChapterByCourseId(String courseid) {
        return chapterRepo.findByCourseid(courseid);
    }

    public Chapter updateChapter(String courseid, Chapter updatedChapter) {
        Chapter chapter = chapterRepo.findByChapterid(courseid);

        if (chapter == null) {
            throw new RuntimeException("Chapter not found with course ID: " + courseid);
        }

        chapter.setCoursename(updatedChapter.getCoursename());
        chapter.setCourseid(updatedChapter.getCourseid());

        // Chapter 1
        chapter.setChapter1name(updatedChapter.getChapter1name());
        chapter.setChapter1id(updatedChapter.getChapter1id());
        chapter.setChapter1description(updatedChapter.getChapter1description());
        chapter.setChapter1videoname(updatedChapter.getChapter1videoname());
        chapter.setChapter1videourl(updatedChapter.getChapter1videourl());
        chapter.setChapter1documentname(updatedChapter.getChapter1documentname());
        chapter.setChapter1documenturl(updatedChapter.getChapter1documenturl());

        // Chapter 2
        chapter.setChapter2name(updatedChapter.getChapter2name());
        chapter.setChapter2id(updatedChapter.getChapter2id());
        chapter.setChapter2description(updatedChapter.getChapter2description());
        chapter.setChapter2videoname(updatedChapter.getChapter2videoname());
        chapter.setChapter2videourl(updatedChapter.getChapter2videourl());
        chapter.setChapter2documentname(updatedChapter.getChapter2documentname());
        chapter.setChapter2documenturl(updatedChapter.getChapter2documenturl());

        // Chapter 3
        chapter.setChapter3name(updatedChapter.getChapter3name());
        chapter.setChapter3id(updatedChapter.getChapter3id());
        chapter.setChapter3description(updatedChapter.getChapter3description());
        chapter.setChapter3videoname(updatedChapter.getChapter3videoname());
        chapter.setChapter3videourl(updatedChapter.getChapter3videourl());
        chapter.setChapter3documentname(updatedChapter.getChapter3documentname());
        chapter.setChapter3documenturl(updatedChapter.getChapter3documenturl());

        // Chapter 4
        chapter.setChapter4name(updatedChapter.getChapter4name());
        chapter.setChapter4id(updatedChapter.getChapter4id());
        chapter.setChapter4description(updatedChapter.getChapter4description());
        chapter.setChapter4videoname(updatedChapter.getChapter4videoname());
        chapter.setChapter4videourl(updatedChapter.getChapter4videourl());
        chapter.setChapter4documentname(updatedChapter.getChapter4documentname());
        chapter.setChapter4documenturl(updatedChapter.getChapter4documenturl());

        // Chapter 5
        chapter.setChapter5name(updatedChapter.getChapter5name());
        chapter.setChapter5id(updatedChapter.getChapter5id());
        chapter.setChapter5description(updatedChapter.getChapter5description());
        chapter.setChapter5videoname(updatedChapter.getChapter5videoname());
        chapter.setChapter5videourl(updatedChapter.getChapter5videourl());
        chapter.setChapter5documentname(updatedChapter.getChapter5documentname());
        chapter.setChapter5documenturl(updatedChapter.getChapter5documenturl());

        return chapterRepo.save(chapter);
    }

	
	

	
}