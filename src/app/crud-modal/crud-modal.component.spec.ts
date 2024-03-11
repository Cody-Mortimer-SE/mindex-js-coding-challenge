import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudModalComponent } from './crud-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReportCrudEvent, CrudEventType } from '../crud-event';
import { Employee } from '../employee';

describe('CrudModalComponent', () => {
  let component: CrudModalComponent;
  let fixture: ComponentFixture<CrudModalComponent>;
  const employee = new Employee(1, 'Test', 'Employee', 'Test Employee', 12345);
  const report = new Employee(2, 'Tets', 'Report', 'Test Report', 123);
  const crudEvent = new ReportCrudEvent(employee, report, CrudEventType.Edit);
  const data = {
    crudEvent: crudEvent
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudModalComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
