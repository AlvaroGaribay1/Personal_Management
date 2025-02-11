import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AccessService } from '../../services/access.service';
import { DepartmentService } from '../../services/department.service';
import { DepartmentsService } from '../../services/departments.service';
import e from 'express';

@Component({
  selector: 'app-user',
  imports: [
    MatTableModule,
    CommonModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: any[] = [];
  access: any[] = [];
  departments: any[] = [];
  form!: FormGroup;

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');

  constructor(
    public userService: UserServiceService,
    public fb: FormBuilder,
    public accessService: AccessService,
    public departmentService: DepartmentsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      access: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });

    this.accessService.getAllAccess().subscribe((res) => {
      this.access = res;
    });

    this.departmentService.getAllDepartments().subscribe(
      (res) => {
        this.departments = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveEmployee() {
    this.userService.saveEmployee(this.form.value).subscribe(
      (res) => {
        this.form.reset();
        this.users = this.users.filter(
          (user: { id: any }) => res.id !== user.id
        );
        this.users.push(res);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  deleteEmployee(user: any) {
    this.userService.deleteEmployee(user.id).subscribe(
      (res) => {
        if (res === true) {
          // Solo si la eliminación fue exitosa
          this.users = this.users.filter((p: { id: any }) => p.id !== p.id);
          this.cdr.detectChanges(); // 🚀 Fuerza la actualización de la vist
        }
      },
      (error) => {
        console.error('Error al eliminar:', error);
      }
    );
  }

  modify(user: any) {
    this.form.setValue({
      id: user.id,
      name: user.name,
      password: user.password,
      access: user.access,
      department: user.department
    })
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'password',
    'access',
    'department',
    'options',
  ];
}


