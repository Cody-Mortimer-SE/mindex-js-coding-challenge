import { Employee } from "./employee";

export class ReportCrudEvent {
    // The ReportCrudEvent class holds information on the individual who is editing one of their reports, and said report
    employee: Employee;
    report: Employee;
    eventType: CrudEventType;
  
  
    constructor(employee: Employee, report: Employee, eventType: CrudEventType) {
      this.employee = employee;
      this.report = report;
      this.eventType = eventType;
    }
  
  }
  
  export enum CrudEventType {
    Edit = "Edit",
    Delete = "Delete"
  }