export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  directReports?: Array<number>;
  compensation: number;

  constructor(id: number, firstName: string, lastName: string, position: string, compensation: number, directReports?: Array<number>){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.compensation = compensation;
    if (directReports)
      this.directReports = directReports;
  }
}
