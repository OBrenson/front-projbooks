import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../model/book";
import {Author} from "../model/author";
import {ApiService} from "../api.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  isLoggedIn = false;

  private uri = "authors"

  public length = 100;
  public dataSource = new MatTableDataSource<Author>()
  public displayedColumns = ['name', 'books', 'save', 'delete']
  public pageNum = 0;
  public pageSize = 5;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadAuthors()
  }

  loadAuthors() {
    this.apiService.getAuthors(this.pageNum, this.pageSize).subscribe((res) => {
      res.push({name: "", id: "", books: []})
      this.dataSource.data = res
      this.apiService.countAuthors().subscribe(count => {
        this.length = count
      })
    })
  }

  getAuthorsNames(authors: Author[]): String {
    return authors.map(a => a.name).join(", ")
  }

  public save(author: Author) {
    this.apiService.save<Author>(author, this.uri, this.loadAuthors, this)
    if(author.id == "") {
      this.loadAuthors()
    }
  }

  public delete(id: String) {
    this.apiService.delete(id, this.uri, this.loadAuthors, this)
  }


  public handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageNum = event.pageIndex
    this.loadAuthors()
  }
}
