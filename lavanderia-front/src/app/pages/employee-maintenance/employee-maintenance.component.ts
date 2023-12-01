import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/app/environment';

interface EmployeeMaintenance {
  id: number
  nome: string
  email: string
  datanascimento: string
  senha: string
}

@Component({
  selector: 'app-employee-maintenance',
  templateUrl: './employee-maintenance.component.html',
})
export class EmployeeMaintenanceComponent {
  apiUrl = environment.apiUrl;
  listaVazia: boolean = false;
  employees: EmployeeMaintenance[] = []
  itemEmEdicao: EmployeeMaintenance | null = null
  RemovingItem: EmployeeMaintenance | null = null
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient) {}

  newEmployee: EmployeeMaintenance = {
    id: 0,
    nome: '',
    email: '',
    datanascimento: '',
    senha: '',
  };

  errorMessages = { nome: '', email: '', datanascimento: '', senha: '' };

  editItem(item: EmployeeMaintenance) {
    this.itemEmEdicao = { ...item };
    this.newEmployee = { ...item };

    if (!this.itemEmEdicao) {
      this.itemEmEdicao = {
        id: 0,
        nome: '',
        email: '',
        datanascimento: '',
        senha: '',
      }
    }else {
      this.newEmployee.senha = '';
    }
  }

  ngOnInit(): void {
    this.http.get<EmployeeMaintenance[]>(this.apiUrl + 'employee').subscribe({
      next: (data: EmployeeMaintenance[]) => {
        this.employees = data;
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
        this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
      },
    });
  }

  addItem() {
    if (this.newEmployee.nome && this.newEmployee.email && this.newEmployee.datanascimento && this.newEmployee.senha && this.validateForm()) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
      const formattedDate = moment(this.newEmployee.datanascimento).format('DD/MM/YYYY');
      const employeeToAdd: EmployeeMaintenance = {
        ...this.newEmployee,
        datanascimento: formattedDate,
      };
    
      this.http.post<EmployeeMaintenance>(
        this.apiUrl + 'employee',
        employeeToAdd,
        { headers }
      ).subscribe({
        next: (data: EmployeeMaintenance) => {
          this.employees.push(data);
          this.newEmployee = {
            id: 0,
            nome: '',
            email: '',
            datanascimento: '',
            senha: '',
          };
          console.log(data)
          this.listaVazia = false;
        },
        error: (error: any) => {
          console.error('Erro ao adicionar o item:', error);
          this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
        },
      });
    }
  }

  putItem() {
    if (this.itemEmEdicao) {
      this.itemEmEdicao = { ...this.itemEmEdicao, ...this.newEmployee };

      const index = this.employees.findIndex(
        (item) => item.id === this.itemEmEdicao?.id,
      );
      if (index !== -1) {
        this.http
          .put<EmployeeMaintenance>(
            `${this.apiUrl}employee/${this.itemEmEdicao.id}`,
            this.itemEmEdicao,
          )
          .subscribe({
            next: (data: EmployeeMaintenance) => {
              this.employees[index] = data;
              this.itemEmEdicao = null;
              this.cleanForm()
            },
            error: (error: any) => {
              console.error('Erro ao atualizar o item:', error);
              this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
            },
          });
      }
    }
  }

  updateItem() {
    if (!this.newEmployee.nome && !this.newEmployee.email && !this.newEmployee.datanascimento && !this.newEmployee.senha) {
      this.validateForm();
      return;
    }
    
    if (this.newEmployee.id === 0) {
      this.addItem();
    } else {
      this.putItem();
    }
  }

  removeItem(item: EmployeeMaintenance) {
    const index = this.employees.indexOf(item);
    if (index !== -1) {
      const employeeId = item.id;

      this.http.delete(`${this.apiUrl}employee/${employeeId}`).subscribe({
        next: () => {
          this.employees.splice(index, 1);
          this.listaVazia = this.employees.length === 0;
        },
        error: (error: any) => {
          console.error('Erro ao excluir o item:', error);
          this.showErrorAlert = true;

        setTimeout(() => {
        this.showErrorAlert = false;
         }, 5000);
        },
      });
    }
  }

  cleanForm() {
    this.itemEmEdicao = null;
    this.newEmployee = {
      id: 0,
      email: '',
      nome: '',
      datanascimento: '',
      senha: '',
    };
  }

  validateForm(): boolean {
    this.errorMessages = {
      nome: '',
      email: '',
      datanascimento: '',
      senha: '',
    };
  
    this.validateName();
    this.validateEmail();
    this.validateDataNascimento();
    this.validateSenha();
  
    return !Object.values(this.errorMessages).some(message => message !== '');
  }

  validateField(fieldName: string): void {
    switch (fieldName) {
      case 'nome':
        this.validateName();
        break;
      case 'email':
        this.validateEmail();
        break;
      case 'datanascimento':
        this.validateDataNascimento();
        break;
      case 'senha':
        this.validateSenha();
        break;
    }
  }

  validateName(): void {
    this.errorMessages.nome = '';

    if (!this.newEmployee.nome) {
      this.errorMessages.nome = 'Nome é obrigatório';
    }
  }

  validateDataNascimento(): void {
    this.errorMessages.datanascimento = '';

    if (!this.newEmployee.datanascimento) {
      this.errorMessages.datanascimento = 'Data de nascimento é obrigatória';
    }
  }

  validateEmail(): void {
    this.errorMessages.email = '';

    if (!this.newEmployee.email.includes('@')) {
      this.errorMessages.email = 'Email inválido';
    }
  }

  validateSenha(): void {
    this.errorMessages.senha = '';

    if (this.newEmployee.senha.length !== 4) {
      this.errorMessages.senha = 'Máximo quatro caracteres';
    }
  }

  openConfirmationModal(employees: EmployeeMaintenance) {
    this.RemovingItem = employees;
  }

  confirmRemoveItem(employees: EmployeeMaintenance) {
    if (employees) {
      this.removeItem(employees)
      this.RemovingItem = null;
    }
  }

  cancelRemoveItem() {
    this.RemovingItem = null;
  }
}


