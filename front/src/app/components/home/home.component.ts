import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../../services/employee/employee-service.service';
import { Chart } from 'chart.js';
import { DepartmentsService } from '../../services/department/departments.service';
import e from 'express';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ctx = document.getElementById('myChart');
  //Variables for active and inactive employees
  employees: any[] = [];
  activeEmployees: any[] = [];
  inactiveEmployees: any[] = [];
  employeesDepartments = new Map<String, number>();
  employeesByAccess = new Map<String, number>();

  constructor(private employeeService: EmployeeServiceService) {}

  ngOnInit(): void {
    this.employeeService.getAllUsers().subscribe((res) => {
      this.employees = res;

      this.countEmployeesByDepartment();
      this.countEmployeesByAccess();
      this.createChart();
    });
  }

  countEmployeesByAccess() {
    for (let i = 0; i < this.employees.length; i++) {
      const accessName = this.employees[i].access.name;

      if (this.employeesByAccess.has(accessName)) {
        this.employeesByAccess.set(
          accessName,
          this.employeesByAccess.get(accessName)! + 1
        );
      } else {
        this.employeesByAccess.set(accessName, 1);
      }
    }
  }

  countEmployeesByDepartment() {
      for (let i = 0; i < this.employees.length; i++) {
        const departmentName = this.employees[i].department.name;

        if (this.employeesDepartments.has(departmentName)) {
          this.employeesDepartments.set(
            departmentName,
            this.employeesDepartments.get(departmentName)! + 1
          );
        } else {
          this.employeesDepartments.set(departmentName, 1);
        }
      }
  }

  createChart(): void {
    this.activeEmployees = this.employees.filter((employee) => employee.active);
    this.inactiveEmployees = this.employees.filter(
      (employee) => !employee.active
    );

    new Chart('active-inactive', {
      type: 'bar',
      data: {
        labels: ['Actives', 'Inactives'],
        datasets: [
          {
            label: '# of Total employees',
            data: [this.activeEmployees.length, this.inactiveEmployees.length],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cambia el fondo del tooltip
            bodyColor: 'white', // Cambia el color del texto en el tooltip
          },
          legend: {
            labels: {},
          },
        },
        interaction: {
          mode: 'nearest', // Hover sobre el punto más cercano
          intersect: false, // No necesita intersectar
        },
        elements: {
          bar: {
            hoverBackgroundColor: 'rgb(35, 63, 105)', // Cambia el color de fondo al hacer hover
            hoverBorderColor: 'rgb(255, 255, 255)', // Cambia el color del borde al hacer hover
            hoverBorderWidth: 2, // Aumenta el grosor del borde al hacer hover
            borderRadius: 5, // Radio de las barras
          },
        },
        animation: {
          duration: 500, // Duración de la animación global
          easing: 'easeInOutQuad', // Tipo de aceleración para la animación
        },
        scales: {
          x: {},
          y: {},
        },
      },
    });

    //Graphic for employees by department
    new Chart('employees-by-department', {
      type: 'bar',
      data: {
        labels: [...this.employeesDepartments.keys()],
        datasets: [
          {
            label: '# of Total employees',
            data: [...this.employeesDepartments.values()],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cambia el fondo del tooltip
            bodyColor: 'white', // Cambia el color del texto en el tooltip
          },
          legend: {
            labels: {
            },
          },
        },
        interaction: {
          mode: 'nearest', // Hover sobre el punto más cercano
          intersect: false, // No necesita intersectar
        },
        elements: {
          bar: {
            hoverBackgroundColor: 'rgb(35, 63, 105)', // Cambia el color de fondo al hacer hover
            hoverBorderColor: 'rgb(255, 255, 255)', // Cambia el color del borde al hacer hover
            hoverBorderWidth: 2, // Aumenta el grosor del borde al hacer hover
            borderRadius: 5, // Radio de las barras
          },
        },
        animation: {
          duration: 500, // Duración de la animación global
          easing: 'easeInOutQuad', // Tipo de aceleración para la animación
        },
        scales: {
          x: {
          },
          y: {
          },
        },
      },
    });




    //Graphic for employees by access
    new Chart('employees-by-access', {
      type: 'doughnut',
      data: {
        labels: [...this.employeesByAccess.keys()],
        datasets: [
          {
            label: 'Employees',
            data: [...this.employeesByAccess.values()],
            backgroundColor: [
              'rgba(12, 149, 240, 0.53)',
              'rgba(165, 0, 36, 0.7)',
            ],
            borderWidth: 1,
            hoverOffset: 5,
            hoverBorderWidth: 3,
            hoverBorderColor: 'rgb(0, 0, 0)',
          },
        ],
      },
    });










  }






}
