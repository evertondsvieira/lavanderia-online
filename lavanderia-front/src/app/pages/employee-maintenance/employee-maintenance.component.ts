import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  newEmployee: EmployeeMaintenance = {
    id: 0,
    nome: '',
    email: '',
    datanascimento: '',
    senha: '',
  };

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
        console.log(this.employees);
      },
      error: (error: any) => {
        console.error('Erro ao buscar os dados:', error);
      },
    });
  }

  addItem() {
    if (this.newEmployee.nome && this.newEmployee.email && this.newEmployee.datanascimento && this.newEmployee.senha) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http
        .post<EmployeeMaintenance>(this.apiUrl + 'employee', this.newEmployee, { headers })
        .subscribe({
          next: (data: EmployeeMaintenance) => {
            this.employees.push(data);
            this.newEmployee = {
              id: 0,
              nome: '',
              email: '',
              datanascimento: '',
              senha: '',
            };
            this.listaVazia = false;
          },
          error: (error: any) => {
            console.error('Erro ao adicionar o item:', error);
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
            },
          });
      }
    }
  }

  updateItem() {
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
}
