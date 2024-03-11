import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { Employee } from '../employee';
import { CrudEventType, ReportCrudEvent } from '../crud-event';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);

    expect(comp).toBeTruthy();
  }));

  it('should create full reports list', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    const employees = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'McGee',
        position: 'CEO',
        directReports: [2, 3],
        compensation: 100
      },
      {
        id: 2,
        firstName: 'Homer',
        lastName: 'Thompson',
        position: 'Dev Manager',
        directReports: [4],
        compensation: 50
      },
      {
        id: 3,
        firstName: 'Rock',
        lastName: 'Strongo',
        position: 'Lead Tester',
        compensation: 50
      },
      {
        id: 4,
        firstName: 'Max',
        lastName: 'Power',
        position: 'Junior Software Engineer',
        compensation: 25
      }
    ];

    comp.employee = employees[0];
    comp.allEmployees = employees;

    comp.ngOnInit();
    expect(comp.allReports.length).toEqual(3);
    expect(comp.directReports.length).toEqual(2);
  }));

  it('should emit edit event', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);

    spyOn(comp.editCompensationEvent, 'emit');

    const report = new Employee(2, 'Test', 'Testerson', 'Tester', 123)
    const crudEvent = new ReportCrudEvent(comp.employee, report, CrudEventType.Edit)

    comp.editReportCompensation(report);
    expect(comp.editCompensationEvent.emit).toHaveBeenCalledWith(crudEvent);
  }));

  it('should emit remove event', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);

    spyOn(comp.removeReportEvent, 'emit');

    const report = new Employee(2, 'Test', 'Testerson', 'Tetser', 123)
    const crudEvent = new ReportCrudEvent(comp.employee, report, CrudEventType.Delete)

    comp.removeReport(report);
    expect(comp.removeReportEvent.emit).toHaveBeenCalledWith(crudEvent);
  }));
});
