import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatSidenavModule, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  isAdmin: boolean = false;

  constructor(private sidebarService: SidebarService, private authService: AuthService) { }

  ngOnInit() {
    this.sidebarService.sidebarOpen$.subscribe(open => {
      this.isSidebarOpen = open;
    });
  
    // Suscribirse al observable de rol
    this.authService.role$.subscribe(role => {
      this.isAdmin = role === 'admin'; // Verifica si el rol es "admin"
    });
  }
}
