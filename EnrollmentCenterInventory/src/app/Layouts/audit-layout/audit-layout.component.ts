import { Component } from '@angular/core';
import { AuditModel } from './audit.model';

@Component({
  selector: 'app-audit-layout',
  templateUrl: './audit-layout.component.html',
  styleUrls: ['./audit-layout.component.css']
})
export class AuditLayoutComponent {
  items: AuditModel[] = [];
  

}
