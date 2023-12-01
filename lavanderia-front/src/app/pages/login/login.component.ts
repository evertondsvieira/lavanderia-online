import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { AuthService } from 'src/app/utils/AuthService';

interface ILoginUser {
  email: string;
  senha: string;
  token: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  apiUrl = environment.apiUrl;
  errorMessage: string = '';
  user: ILoginUser[] = [];
  newUser: ILoginUser = {
    email: '',
    senha: '',
    token: '',
    role: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    if (this.areAllFieldsFilled()) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post<ILoginUser>(this.apiUrl + 'login', this.newUser, { headers })
        .subscribe({
          next: (user) => {
            this.user.push(user);

            localStorage.setItem('@token', user.token);

            this.newUser = {
              email: '',
              senha: '',
              token: '',
              role: '',
            };

            const userRole = this.authService.getUserRole();

            if (userRole === 'usuario') {
              this.router.navigate(['/user/home']);
            } else if (userRole === 'funcionario') {
              this.router.navigate(['/employee/home']);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: (error) => {
            this.errorMessage = 'Email ou senha errados';
          },
        });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos';
    }
  }

  areAllFieldsFilled(): boolean {
    return this.newUser.email !== '' && this.newUser.senha !== '';
  }
}
