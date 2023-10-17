import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../model/book";
import {ApiService} from "../api.service";
import {User} from "../model/user";
import {MatSelectChange} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {Author} from "../model/author";
import {Role} from "../model/role";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  public displayedColumns = ['name', 'roles', 'password', 'save', 'delete']
  public dataSource = new MatTableDataSource<User>()

  private uri = "users"

  public roles = [
    {id: "e5439ba5-bebd-444c-b3e7-1cdd034e644f", name: "ADMIN"},
    {id: "922e9c5f-f580-433e-8e0c-0808c6424ecb", name: "DEFAULT"}
  ]

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(res => {
      res.push({id: "", name: "", password: "", roles: []})
      this.dataSource.data = res
    })
  }

  public addRole(event: MatSelectChange, user: User) {
    let changed = true
    if(event.value == undefined) {
      return
    }
    for(let a of user.roles) {
      if(a.id === event.value.id) {
        changed = false
      }
    }
    if(changed) {
      user.roles.push(event.value)
      event.value = null
    }
    event.source.options.forEach((data: MatOption) => data.deselect());
  }

  public deleteRole(role: Role, user: User) {
    for(let i = 0; i < user.roles.length; i++) {
      if(user.roles[i].id === role.id) {
        user.roles.splice(i, 1)
        return
      }
    }
  }

  public save(user: User) {
    this.apiService.save<User>(user, this.uri, this.loadUsers, this)
    if(user.id == "") {
      this.loadUsers()
    }
  }

  public delete(id: String) {
    this.apiService.delete(id, this.uri, this.loadUsers, this)
  }

}
