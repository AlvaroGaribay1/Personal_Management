import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { EmployeeServiceService } from '../../services/employee/employee-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AccessService } from '../../services/access/access.service';
import { DepartmentsService } from '../../services/department/departments.service';
import e from 'express';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-user',
  imports: [
    MatTableModule,
    CommonModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  access: any[] = [];
  departments: any[] = [];
  form!: FormGroup;
  searchText = '';
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [
    'id',
    'name',
    'date_in',
    'date_out',
    'state',
    'access',
    'department',
    'options',
  ];

  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Asignar MatSort después de la vista cargada
  }

  constructor(
    public employeeService: EmployeeServiceService,
    public fb: FormBuilder,
    public accessService: AccessService,
    public departmentService: DepartmentsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      date_in: ['', Validators.required],
      date_out: [''],
      access: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.employeeService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res || []; // Evita que users sea null
      this.dataSource.data = [...this.users]; // Esto notifica correctamente a la tabla
      this.cdr.detectChanges(); // 🚀 Forzar detección de cambios para actualizar la vista
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


    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'access') {
        return item.access?.name?.toLowerCase() || ''; // Evita errores si es null
      }

      if (property === 'department') {
        return item.department?.name?.toLowerCase() || ''; // Evita errores si es null
      }
      return item[property];
    };

  }

  saveEmployee() {
    this.employeeService.saveEmployee(this.form.value).subscribe(
      (res) => {
        this.form.reset();
        this.users = this.users.filter((user) => res.id !== user.id); // Remueve el usuario antiguo si existe
        this.users.push(res); // Agrega el nuevo usuario

        this.users.sort((a, b) => a.id - b.id); // Ordena los usuarios por ID
        this.dataSource.data = [...this.users]; // Esto notifica correctamente a la tabla
        this.dataSource.filter = this.searchText.trim().toLowerCase();
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
    this.employeeService.deleteEmployee(user.id).subscribe(
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
      date_in: user.date_in,
      date_out: user.date_out,
      access: user.access,
      department: user.department,
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}


