import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'employees',
        pathMatch: 'full'
    },

    {
        path: 'employees',
        loadComponent: () =>
            import('./employee-list/employee-list.component').then((x) => x.EmployeeListComponent),
    },

    {
        path: 'employees/edit/:id',
        loadComponent: () =>
            import('./update-employee/update-employee.component').then((x) => x.UpdateEmployeeComponent),
    },

    {
        path: 'employees/create',
        loadComponent: () =>
            import('./create-employee/create-employee.component').then((x) => x.CreateEmployeeComponent),
    },

    

];
