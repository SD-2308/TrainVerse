export class Event {
    id: number;
    date: string;
    imageUrl: string;
    speaker: string;
    title: string;
    description: string;
    timing: string;
    meetingUrl: string;
  
    constructor(
      id: number,
      date: string,
      imageUrl: string,
      speaker: string,
      title: string,
      description: string,
      timing: string,
      meetingUrl: string
    ) {
      this.id = id;
      this.date = date;
      this.imageUrl = imageUrl;
      this.speaker = speaker;
      this.title = title;
      this.description = description;
      this.timing = timing;
      this.meetingUrl = meetingUrl;
    }
  }
  