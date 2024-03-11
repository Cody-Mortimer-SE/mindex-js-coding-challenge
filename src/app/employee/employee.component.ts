import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ReportCrudEvent, CrudEventType } from '../crud-event';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @Input() employee: Employee;
  /* 
    Grab the full list of employees for determining reports
    Technically we could do this by calling employeeservice.get() for each direct report and their reports,
    but I'd rather avoid making multiple calls when we already have the full list available
  */
  @Input() allEmployees: Employee[];
  @Output() editCompensationEvent = new EventEmitter<ReportCrudEvent>();
  @Output() removeReportEvent = new EventEmitter<ReportCrudEvent>();

  allReports: Employee[];
  directReports: Employee[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // Gather a list of all reports
    this.allReports = this.constructFullReportList(this.employee)
    // Filter out our direct reports for display
    this.directReports = this.allReports.filter((e) => this.employee.directReports.includes(e.id))
  }

  // Recursive function that gathers an array of all direct and indirect reports of a given employee
  private constructFullReportList(employee: Employee): Employee[] {
    let totalReports: Employee[] = [];
    if (employee.directReports) {

      // Gather direct reports
      let directReports: Employee[] = [];
      directReports = this.allEmployees.filter((e) => employee.directReports.includes(e.id))

      // Gather indirect reports
      let indirectReports: Employee[] = [];
      directReports.forEach((report) => {
        indirectReports = indirectReports.concat(this.constructFullReportList(report))
      });
      totalReports = directReports.concat(indirectReports);
    }
    return totalReports;
  }

  // Emits a ReportCrudEvent to the EmployeeListComponent to edit their compensation
  private editReportCompensation(report: Employee){
    const crudEvent = new ReportCrudEvent(this.employee, report, CrudEventType.Edit)
    this.editCompensationEvent.emit(crudEvent);
  }

  // Emits a ReportCrudEvent to the EmployeeListComponent to remove them from this employee's reports
  private removeReport(report: Employee){
    const crudEvent = new ReportCrudEvent(this.employee, report, CrudEventType.Delete)
    this.removeReportEvent.emit(crudEvent)
  }
}
