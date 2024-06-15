import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',
})
export class CreateEmployeeComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  onSave() {
    this.httpClient
      .post(`${environment.baseApiUrl}/employees`, this.form.value)
      .subscribe({
        next: (data) => {
          this.snackBar.open('Employee added sucessfully', 'close', {
            duration: 3000,
          });
          this.router.navigate(['employees']);
        },
        error: () => {
          this.snackBar.open('An Error Occurred!', 'Close', {
            duration: 3000,
          });
        },
      });
  }
}
