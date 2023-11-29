import { Component } from '@angular/core';
import { IProduct } from 'src/app/components/ui-components/product/product.component';
import { environment } from 'src/app/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export interface IUser {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  senha: string;
  salt: string;
  pedidos?: IProduct[];
}

interface CepData {
  uf: string;
  localidade: string;
  bairro: string;
  logradouro: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  apiUrl = environment.apiUrl;
  users: IUser[] = [];
  newUser: IUser = {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    cep: '',
    uf: '',
    cidade: '',
    bairro: '',
    rua: '',
    senha: '',
    salt: '',
    pedidos: [],
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
        .post<IUser>(`${this.apiUrl}user`, this.newUser, { headers })
        .subscribe({
          next: (user) => {
            this.users.push(user);

            this.newUser = {
              id: 0,
              nome: '',
              telefone: '',
              email: '',
              cpf: '',
              cep: '',
              uf: '',
              cidade: '',
              bairro: '',
              rua: '',
              senha: '',
              salt: '',
              pedidos: [],
            };
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erro ao registrar o usuário:', error);
          },
        });
    } else {
      console.error('Preencha todos os campos antes de enviar o formulário.');
    }
  }

  onCepChange() {
    if (this.newUser.cep.length === 8) {
      this.http
        .get<CepData>(`https://viacep.com.br/ws/${this.newUser.cep}/json/`)
        .subscribe({
          next: (data) => {
            this.newUser.uf = data.uf
            this.newUser.cidade = data.localidade
            this.newUser.bairro = data.bairro
            this.newUser.rua = data.logradouro
          },
          error: (error) => {
            console.error('Erro ao consultar o CEP:', error)
          },
        })
    }
  }

  areAllFieldsFilled(): boolean {
    return (
      this.newUser.nome !== '' &&
      this.newUser.telefone !== '' &&
      this.newUser.email !== '' &&
      this.newUser.cpf !== '' &&
      this.newUser.cep !== '' &&
      this.newUser.uf !== '' &&
      this.newUser.cidade !== '' &&
      this.newUser.bairro !== '' &&
      this.newUser.rua !== ''
    );
  }
}
