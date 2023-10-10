import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthenticationService} from "../login/auth.service";
import {Book} from "../model/book";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {Author} from "../model/author";
import {FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit  {
  isLoggedIn = false;

  public dataSource = new MatTableDataSource<Book>()

  public displayedColumns = ['title', 'genre', 'authors', 'publ']

  public publs = [{id: "f95739ab-a751-4af9-8016-f25a17257bed", name: "pabl1"}, {id: "2", name: "publ2"}, {id: "3", name: "publ3"}]

  public genres = [{id: "f95739ab-a751-4af9-8016-f25a17257bed", name: "genre1"}, {id: "2", name: "genre2"}, {id: "3", name: "genre3"}]

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getBooks(0).subscribe((res) => {
      res.push({authors: [], genre: {id: "", name: ""}, id: "", publ: {id: "", name: ""}, title: ""})
      console.log(res)
      this.dataSource.data = res
    })
  }

  public getAuthorsNames(authors: Author[]): String {
    return authors.map(a => a.name).join(", ")
  }

  onPublChange(event: MatSelectChange, album: FormGroup) {
      let a = 1
  }
}
