import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportCrudEvent, CrudEventType } from '../support';

@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.css']
})
export class CrudModalComponent implements OnInit {
  crudEvent: ReportCrudEvent;
  eventEnum = CrudEventType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {crudEvent: ReportCrudEvent}) { 
    // Deep clone to remove references from our original objects, so we're not editing the in-memory objects
    this.crudEvent = JSON.parse(JSON.stringify(data.crudEvent));
  }

  ngOnInit(): void {
  }

}
