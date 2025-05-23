import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _http: HttpClient) { }

  addEvents(event: any): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addevent`, event);
  }
  
  updateEvent(id: number, event: any): Observable<any> {
    return this._http.put(`${NAV_URL}/updateevent/${id}`, event);
  }

  getEventsById(id: number): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/events/${id}`);
  }

  public getAllEvents(): Observable<any[]> {
    return this._http.get<any[]>(`${NAV_URL}/events`);
  }

  public getEventEnrollmentByEmail(loggedUser : string, currRole : string) : Observable<any[]> {
    return this._http.get<any>(`${NAV_URL}/geteventenrollmentbyemail/`+loggedUser+"/"+currRole);
  }
}
