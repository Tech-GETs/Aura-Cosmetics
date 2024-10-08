// src/app/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
