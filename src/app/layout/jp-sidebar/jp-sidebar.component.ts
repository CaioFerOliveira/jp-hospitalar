import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-jp-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgFor,
    MatDividerModule,
  ],
  templateUrl: './jp-sidebar.component.html',
  styleUrl: './jp-sidebar.component.css',
})
export class JpSidebarComponent {
  private router = inject(Router);

  navegar(rota: string) {
    this.router.navigate([`${rota}`]);
  }
}
