import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../service/login.service';


@Injectable({
  providedIn: 'root'
})
export class ApprovalGuard implements CanActivate 
{
  constructor(private _router : Router, private _service : LoginService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  {
    if (this._service.isUserLoggedIn() && this._service.userType() === 'admin' || this._service.userType() === 'professor') 
    {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
  
}
