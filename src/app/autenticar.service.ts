import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  constructor(private router:Router) { }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  login(token:string){
    localStorage.setItem("token",token)
  }
  logout(){
    localStorage.removeItem('token')
    // * this.router.navigate(['/login'])
  }
}
