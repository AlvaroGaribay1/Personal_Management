import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/department/departments.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-departments',
  imports: [CommonModule, RouterLink],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})


export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  selectedDepartment: any;


  constructor (
    private departmentService: DepartmentsService
  ) {



  }
  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe(res => {
      this.departments = res;
    })
  }

  select(selectedDepartment: any) {
    this.selectedDepartment = selectedDepartment;
    console.log(this.selectedDepartment);
  }
}
