export class EventRegistration {
    id: number;
    name: string;
    email: string;
    phone: string;
    eventTitle: string;
    date: string;
    imageUrl: string;
    speaker: string;
    description: string;
    timing: string;
    meetingUrl:string;
  
    constructor(
      id: number,
      name: string,
      email: string,
      phone:string,
      eventTitle: string,
      date: string,
      imageUrl: string,
      speaker: string,
      description: string,
      timing: string,
      meetingUrl:string
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.eventTitle = eventTitle;
      this.date = date;
      this.imageUrl = imageUrl;
      this.speaker = speaker;
      this.description = description;
      this.timing = timing;
      this.meetingUrl = meetingUrl;
    }
  }
  