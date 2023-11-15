import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role && currentUser.role.includes('funcionario')) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}
