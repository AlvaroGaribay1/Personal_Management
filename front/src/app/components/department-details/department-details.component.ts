import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { DepartmentsService } from '../../services/departments.service';


@Component({
  selector: 'app-department-details',
  imports: [],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css',
})
export class DepartmentDetailsComponent implements OnInit {

  departmentId: any;
  department: any;


  constructor(private route: ActivatedRoute, private departmentService: DepartmentsService) {
  }


  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('id')!;
    console.log("El valor del compartido es: " + this.departmentId);
    this.departmentService.getDepartmentById(this.departmentId).subscribe(res => {
      this.department = res;
    })
  }

}
