import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor(private snackBar: MatSnackBar) { }

  employeeList: {
    id: string;
    firstName: string;
    lastName: string;
    gender: "Male" | "Female" | "Other";
    address: string;
  }[] = [];

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.httpClient.get(`${environment.baseApiUrl}/employees`).subscribe({
      next: (data) => {
        this.employeeList = data as {
          id: string;
          firstName: string;
          lastName: string;
          gender: "Male" | "Female" | "Other"; // Assuming gender can only be one of these values
          address: string;
        }[];
      },
      error: () => {
        this.snackBar.open('An Error Occurred!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  navToCreate() {
    this.router.navigate(['employees/create']);
  }

  onEdit(id:string) {
    this.router.navigate(['employees/edit' + id]);
  }

  onDelete(id:string) {
    if (confirm("Do you want to Delete?")) {
      this.httpClient.delete(`${environment.baseApiUrl}/employees/${id}`).subscribe({
        next: (data) => {
          this.snackBar.open('Employee Deleted Sucessfully', 'close', {
            duration:3000,
          });
          this.fetchEmployees();
        },
        error: () => {
          this.snackBar.open('An Error Occurred!', 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
    }
  }

}
