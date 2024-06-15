import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BrowserModule
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() id: string = '';

  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    this.httpClient.get(`${environment.baseApiUrl}/employees/${this.id}`).subscribe({
      next: (data: any) => {
        delete data.id;
        this.form.setValue(data);
      },
      error: () => {
        this.snackBar.open('An error occured!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  onUpdate() {
    this.httpClient.put(`${environment.baseApiUrl}/employees/${this.id}`, this.form.value).subscribe({
      next: (data) => {
        this.snackBar.open('Employee Updated Sucessfully', 'close', {
          duration:3000,
        });
        this.router.navigate(['employees']);
      },
      error: () => {
        this.snackBar.open('An error occured!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

}
