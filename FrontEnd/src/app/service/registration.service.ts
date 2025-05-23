import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Professor } from '../models/professor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = new User();
  professor = new Professor();

  constructor(private _http : HttpClient) { }

public registerUserFromRemote(user : User):Observable<any>
{
    return this._http.post<any>(`${NAV_URL}/registeruser`,user)
}

public registerProfessorFromRemote(professor : Professor):Observable<any>
{
    return this._http.post<any>(`${NAV_URL}/registerprofessor`,professor)
}
}
