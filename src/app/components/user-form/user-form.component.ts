import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.userId = +id;
        this.userService.getUserById(this.userId).subscribe((user: User) => {
          this.form.patchValue(user);
        });
      }
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.userId = +idParam;
      this.userService.getUserById(this.userId).subscribe((user: User) => {
        this.form.patchValue({
          name: user.name,
          email: user.email
        });
      });
    }
  }


onSubmit(): void {
    if (this.form.invalid) return;

    if (this.userId) {
      this.userService.updateUser(this.userId, this.form.value).subscribe(() => {
        console.log('Пользователь обновлен');
        this.router.navigate(['/']);
      });
    } else {
      this.userService.createUser(this.form.value).subscribe(() => {
        console.log('Пользователь создан');
        this.router.navigate(['/']);
      });
    }
  }

}
