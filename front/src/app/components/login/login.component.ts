import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  rememberMe = false;
  role = '';
  email = '';
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  form!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }



  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  //Method to use the authentication service for login and access.
  onLogin() {
    this.authService.login({ username: this.username, password: this.password }, this.rememberMe).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => console.error('Error en login:', err)
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult.set(`Closed with: ${result}`);
      });
  }

  saveUser() {
    this.authService.register(this.form.value).subscribe(res => {
      alert(res);
      this.router.navigate(["/"]);
    }, error => {
      console.error(error);
    })
  }

}
