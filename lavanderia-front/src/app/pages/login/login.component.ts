import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';

interface ILoginUser {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  apiUrl = environment.apiUrl;
  user: ILoginUser[] = [];
  newUser: ILoginUser = {
    email: '',
    senha: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.areAllFieldsFilled()) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http
        .post<ILoginUser>(`${this.apiUrl}login`, this.newUser, { headers })
        .subscribe({
          next: (user) => {
            this.user.push(user);

            this.newUser = {
              email: '',
              senha: '',
            }

            this.router.navigate(['/user/home']);
          },
          error: (error) => {
            console.error('Erro ao logar:', error);
          },
        });
    } else {
      console.error('Preencha todos os campos antes de enviar o formulário.');
    }
  }

  areAllFieldsFilled(): boolean {
    return this.newUser.email !== '' && this.newUser.senha !== '';
  }
}
