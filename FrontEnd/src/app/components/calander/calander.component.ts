import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calander',
  standalone: false,
  templateUrl: './calander.component.html',
  styleUrl: './calander.component.css'
})
export class CalanderComponent implements OnInit{

  currentDate = new Date();
  currentMonth!: number;
  currentYear!: number;

  monthName: string = '';
  days: any[] = [];

  eventDates = [0]; 

  ngOnInit(): void {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.days = [];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.monthName = `${monthNames[this.currentMonth]} ${this.currentYear}`;

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      this.days.push({ date: '', class: 'other-month' });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      const dayOfWeek = date.getDay(); // 0 = Sunday
    
      const isToday =
        d === this.currentDate.getDate() &&
        this.currentMonth === this.currentDate.getMonth() &&
        this.currentYear === this.currentDate.getFullYear();
    
      const isEvent = this.eventDates.includes(d);
    
      let cssClass = '';
      if (isToday) cssClass = 'today';
      else if (isEvent) cssClass = 'event';
    
      if (dayOfWeek === 0) cssClass += ' sunday'; // Add sunday class
    
      this.days.push({ date: d, class: cssClass.trim() });
    }
    

    // Fill trailing days
    const remainder = this.days.length % 7;
    if (remainder > 0) {
      for (let i = 0; i < 7 - remainder; i++) {
        this.days.push({ date: '', class: 'other-month' });
      }
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
}