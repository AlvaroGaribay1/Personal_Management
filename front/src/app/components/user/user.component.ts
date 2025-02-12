import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AccessService } from '../../services/access.service';
import { DepartmentService } from '../../services/department.service';
import { DepartmentsService } from '../../services/departments.service';
import e from 'express';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-user',
  imports: [
    MatTableModule,
    CommonModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FilterPipe,
    FormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: any[] = [];
  access: any[] = [];
  departments: any[] = [];
  form!: FormGroup;
  searchText = '';
  dataSource: any;

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
      this.dataSource = new MatTableDataSource(this.users);
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
        // Elimina el usuario antiguo si existe
        this.users = this.users.filter((user) => res.id !== user.id);
        // Agrega el nuevo usuario
        this.users.push(res);

        // Ordena los usuarios por ID (puedes ajustar la lógica si es necesario)
        this.users.sort((a, b) => a.id - b.id);

        // Actualiza el MatTableDataSource
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.filter = this.searchText.trim().toLowerCase(); // Si tienes filtro aplicado, reinícialo
      },
      (error) => {
        console.error(error);
      }
    );
  }
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult.set(`Closed with: ${result}`);
      });
  }

  deleteEmployee(user: any) {
    this.userService.deleteEmployee(user.id).subscribe(
      (res) => {
        if (res) {
          // Solo si la eliminación fue exitosa
          this.users = this.users.filter((p) => p.id !== user.id);
          this.dataSource = new MatTableDataSource(this.users); // Reinicia el MatTableDataSource para que funcione el filtro y la paginación
          this.dataSource.filter = this.searchText.trim().toLowerCase();
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
      department: user.department,
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'password',
    'access',
    'department',
    'options',
  ];

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
}


