import { async, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';
import { ReportCrudEvent, CrudEventType } from '../crud-event';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { of } from 'rxjs';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent,
      ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should try to open dialog for edit', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;

    const employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);
    const report = new Employee(2, 'Test', 'Testerson', 'Tetser', 123)
    const crudEvent = new ReportCrudEvent(employee, report, CrudEventType.Edit)

    spyOn(comp.dialog, 'open').and.returnValue({
        afterClosed: () => of(crudEvent)
    } as MatDialogRef<typeof CrudModalComponent>);

    // We'll test this function separately
    spyOn(comp, 'editCompensation').and.callFake;

    comp.handleEditCompensation(crudEvent);
    expect(comp.dialog.open).toHaveBeenCalledWith(CrudModalComponent, {
      disableClose: true,
      data: {
        crudEvent: crudEvent
      }
    });
  }));

  it('should try to open dialog for remove', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;

    const employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);
    const report = new Employee(2, 'Test', 'Testerson', 'Tetser', 123)
    const crudEvent = new ReportCrudEvent(employee, report, CrudEventType.Delete)

    spyOn(comp.dialog, 'open').and.returnValue({
        afterClosed: () => of(crudEvent)
    } as MatDialogRef<typeof CrudModalComponent>);

    // We'll test this function separately
    spyOn(comp, 'removeReport').and.callFake;

    comp.handleEditCompensation(crudEvent);
    expect(comp.dialog.open).toHaveBeenCalledWith(CrudModalComponent, {
      disableClose: true,
      data: {
        crudEvent: crudEvent
      }
    });
  }));

  it('should save employee and try to retrieve all employees afterwards', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;

    const employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);

    employeeServiceSpy.save = jasmine.createSpy().and.returnValue(of(employee));
    employeeServiceSpy.getAll = jasmine.createSpy().and.returnValue(of([employee]));

    comp.editCompensation(employee);
    expect(employeeServiceSpy.save).toHaveBeenCalledWith(employee);
    expect(employeeServiceSpy.getAll).toHaveBeenCalled();
  }));

  it('should remove employee and try to retrieve all employees afterwards', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;

    const employee = new Employee(1, 'Boss', 'Bosserson', 'Boss', 12345);

    employeeServiceSpy.remove = jasmine.createSpy().and.returnValue(of(employee));
    employeeServiceSpy.getAll = jasmine.createSpy().and.returnValue(of([]));
    
    comp.removeReport(employee);
    expect(employeeServiceSpy.remove).toHaveBeenCalledWith(employee);
    expect(employeeServiceSpy.getAll).toHaveBeenCalled();
  }));
});
