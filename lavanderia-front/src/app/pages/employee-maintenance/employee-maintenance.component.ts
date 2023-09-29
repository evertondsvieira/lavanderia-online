import { Component } from '@angular/core';

interface EmployeeMaintenance {
  name: string;
  email: string;
  birthDate: string | Date;
  password: string;
}

@Component({
  selector: 'app-employee-maintenance',
  templateUrl: './employee-maintenance.component.html',
})
export class EmployeeMaintenanceComponent {
  listaVazia: boolean = false;
  selectedItem: EmployeeMaintenance | null = null;
  selectedIndex: number | null = null;

  employee: EmployeeMaintenance = {
    name: '',
    email: '',
    birthDate: '',
    password: '',
  };

  itemEmEdicao: EmployeeMaintenance | null = null;

  editItem(item: EmployeeMaintenance) {
    this.itemEmEdicao = { ...item };
    this.employee = {
      name: item.name,
      email: item.email,
      birthDate: new Date(item.birthDate),
      password: '', 
    };
    console.log(this.employee)
  }
  

  updateItem() {
    if (
      this.itemEmEdicao &&
      this.itemEmEdicao.email &&
      this.itemEmEdicao.name &&
      this.itemEmEdicao.birthDate &&
      this.itemEmEdicao.password
    ) {
      const index = this.employees.findIndex(
        (item) => item === this.itemEmEdicao,
      );
      if (index !== -1) {
        this.employees[index] = { ...this.itemEmEdicao };
        this.itemEmEdicao = null;
      }
    } else if (
      this.employee.email &&
      this.employee.name &&
      this.employee.birthDate &&
      this.employee.password
    ) {
      this.employees.push({ ...this.employee });
      this.employee = {
        email: '',
        name: '',
        birthDate: '',
        password: '',
      };
    }
  }

  removeItem(item: EmployeeMaintenance) {
    const index = this.employees.indexOf(item);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    this.listaVazia = this.employees.length === 0;
  }

  cleanForm() {
    this.itemEmEdicao = null;
    this.employee = {
      email: '',
      name: '',
      birthDate: '',
      password: '',
    };
  }

  employees: EmployeeMaintenance[] = [
    {
      email: 'user1@example.com',
      name: 'Alice Smith',
      birthDate: '05/15/1985',
      password: 'securePass123',
    },
    {
      email: 'user2@example.com',
      name: 'Bob Johnson',
      birthDate: '12/30/1992',
      password: 'myP@ssw0rd',
    },
    {
      email: 'user3@example.com',
      name: 'Eva Brown',
      birthDate: '09/22/1988',
      password: 'pass1234',
    },
    {
      email: 'user4@example.com',
      name: 'David Wilson',
      birthDate: '03/10/1995',
      password: 'p@ssw0rd567',
    },
    {
      email: 'user5@example.com',
      name: 'Sophia Davis',
      birthDate: '07/04/1990',
      password: 'securePass456',
    },
    {
      email: 'user6@example.com',
      name: 'Liam Martinez',
      birthDate: '11/20/1987',
      password: 'mySecureP@ss',
    },
    {
      email: 'user7@example.com',
      name: 'Olivia Taylor',
      birthDate: '02/08/1993',
      password: 'p@ssw0rd789',
    },
    {
      email: 'user8@example.com',
      name: 'Lucas Anderson',
      birthDate: '06/25/1986',
      password: 'passw0rd123',
    },  
  ];
}
