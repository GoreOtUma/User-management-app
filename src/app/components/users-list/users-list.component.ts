import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    RouterModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';

  constructor(private userService: UserService, private router: Router) {}

  onEdit(id: number): void {
    this.router.navigate(['/user-form', id]);
  }


  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Показать сообщение об ошибке
      }
    });
  }
  onDelete(id: number): void {
    if (confirm('Вы уверены, что хотите удалить пользователя?')) {
      this.userService.deleteUser(id).subscribe(() => {
        // Обновляем локальный список
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(
      user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filteredUsers = [...this.users];
  }
}
