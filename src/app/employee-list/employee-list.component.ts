import { Component, OnInit } from '@angular/core';
import { catchError, map, reduce } from 'rxjs/operators';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { ReportCrudEvent, CrudEventType } from '../crud-event';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  // Function to refresh employee information on init and after any API action
  private getEmployees() {
    /* 
      In a real-world scenario we might want to balance retrieving all employees vs singular employees based on the use case,
      but for our purposes here doing a getAll handles updating both the employee that was updated, as well as removing them as a
      report from their manager in the case of a removal
    */ 
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  private handleEditCompensation(crudEvent: ReportCrudEvent) {
    this.openDialog(crudEvent);
  }

  private editCompensation(employee: Employee) {
    this.employeeService.save(employee).subscribe( x =>
      this.getEmployees()
    );
  }


  private handleRemoveReport(crudEvent: ReportCrudEvent) {
    this.openDialog(crudEvent);
  }

  private removeReport(employee: Employee) {
    this.employeeService.remove(employee).subscribe( x =>
      this.getEmployees()
    );
  }

  // Handles opening our CRUD modal and dealing with the resulting action
  openDialog(crudEvent: ReportCrudEvent) {
    const dialogRef = this.dialog.open(CrudModalComponent, {
      disableClose: true,
      data: { crudEvent: crudEvent }
    });

    // Take action on the modal close based on the event type, if the closure comes with an event
    dialogRef.afterClosed().subscribe(event => {
      if (event && event.eventType) {
        switch(event.eventType) {
          case CrudEventType.Edit:
            this.editCompensation(event.report);
            break;
          case CrudEventType.Delete:
            this.removeReport(event.report)
            break;
          default:
            break;
        }
      }
    });
  }
}
