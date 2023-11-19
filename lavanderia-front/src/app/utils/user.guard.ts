import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./AuthService";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root', 
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role && currentUser.role.includes('usuario')) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}
