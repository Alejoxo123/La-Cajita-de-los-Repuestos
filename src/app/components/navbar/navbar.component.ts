import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, FormsModule, MatListModule, MatSidenavModule]
})
export class NavbarComponent {
  
  constructor( private sidebarService: SidebarService) { }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}

