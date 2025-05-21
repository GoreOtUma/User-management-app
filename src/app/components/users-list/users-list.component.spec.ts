import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockUserService.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [UsersListComponent, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('должен создать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен загрузить пользователей из сервиса', () => {
    expect(component.users.length).toBe(2);
    expect(component.filteredUsers.length).toBe(2);
  });

  it('должен фильтровать пользователей по имени', () => {
    component.searchTerm = 'Jane';
    component.onSearch();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toContain('Jane');
  });

  it('должен фильтровать пользователей по email', () => {
    component.searchTerm = 'john@';
    component.onSearch();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].email).toContain('john@');
  });

  it('должен сбрасывать фильтр', () => {
    component.searchTerm = 'Jane';
    component.onSearch();
    component.resetSearch();
    expect(component.searchTerm).toBe('');
    expect(component.filteredUsers.length).toBe(2);
  });
});
