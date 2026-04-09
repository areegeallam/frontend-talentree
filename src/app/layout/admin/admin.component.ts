// src/app/layout/admin/admin.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // ← أضيفي ده
import { AdminSidebarComponent } from '../../modules/admin/Components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../modules/admin/Components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,              // ← أضيفي ده عشان router-outlet
    AdminSidebarComponent, 
    AdminHeaderComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent { }
