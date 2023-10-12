import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../login/auth.service";
import {Book} from "../model/book";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {Author} from "../model/author";
import {FormGroup} from "@angular/forms";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {Publ} from "../model/publ";
import {Genre} from "../model/genre";
import {MatOption} from "@angular/material/core";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit  {

  isLoggedIn = false;


  public length = 100;
  public dataSource = new MatTableDataSource<Book>()
  public displayedColumns = ['title', 'genre', 'authors', 'publ', 'save', 'delete']
  public publs: Publ[] = []
  public genres: Genre[] = []
  public authors: Author[] = []
  public pageNum = 0;
  public pageSize = 5;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadBooks()

    this.apiService.getPubls().subscribe((res) => {
      this.publs = res
    })
    this.apiService.getGenres().subscribe((res) => {
      this.genres = res
    })

    this.apiService.getAuthors(0,0).subscribe((res) => {
      this.authors = res
    })
  }

  loadBooks() {
    this.apiService.getBooks(this.pageNum, this.pageSize).subscribe((res) => {
      res.push({authors: [], genre: {id: "", name: ""}, id: "", publ: {id: "", name: ""}, title: "", authorsNames: ""})
      this.dataSource.data = res
      this.apiService.countBooks().subscribe(count => {
        this.length = count
      })
    })
  }

   getAuthorsNames(authors: Author[]): String {
    return authors.map(a => a.name).join(", ")
  }

  public save(book: Book) {
    this.apiService.save<Book>(book, "books", this.loadBooks, this)
    if(book.id == "") {
      this.loadBooks()
    }
  }

  public delete(id: String) {
    this.apiService.delete(id, "books", this.loadBooks, this)
  }

  public addAuthor(event: MatSelectChange, book: Book) {
    let changed = true
    if(event.value == undefined) {
      return
    }
    for(let a of book.authors) {
      if(a.id === event.value.id) {
        changed = false
      }
    }
    if(changed) {
      book.authors.push(event.value)
      book.authorsNames = this.getAuthorsNames(book.authors)
      event.value = null
    }
    event.source.options.forEach((data: MatOption) => data.deselect());
  }

  onPublChange(event: MatSelectChange, book: Book) {
      book.publ.id = event.value
  }

  onGenreChange(event: MatSelectChange, book: Book) {
     book.genre.id = event.value
  }

  public deleteAuthor(author: Author, book: Book) {
    for(let i = 0; i < book.authors.length; i++) {
      if(book.authors[i].id === author.id) {
        book.authors.splice(i, 1)
        return
      }
    }
  }

  public handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageNum = event.pageIndex
    this.loadBooks()
  }
}
