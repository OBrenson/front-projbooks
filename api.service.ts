import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "./model/book";
import {AuthenticationService} from "./login/auth.service";
import {Publ} from "./model/publ";
import {Genre} from "./model/genre";
import {Author} from "./model/author";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) { }

  getBooks(pageNum: number, pageSize: number): Observable<Book[]> {
    return this.httpClient
      .get<Book[]>(`http://localhost:8080/library/books/get/all/${pageNum}/${pageSize}`)
  }

  getPubls(): Observable<Publ[]> {
    return this.httpClient
      .get<Publ[]>('http://localhost:8080/library/publ/get/all')
  }

  getGenres(): Observable<Genre[]> {
    return this.httpClient
      .get<Genre[]>('http://localhost:8080/library/genre/get/all')
  }

  getAuthors(): Observable<Author[]> {
    return this.httpClient
      .get<Author[]>('http://localhost:8080/library/authors/get/all/0/0')
  }

  saveBook(book: Book, reload: Function, context: any) {
    this.httpClient.put('http://localhost:8080/library/books/put', {"value": [book]})
      .subscribe(res => {
        console.log(res)
        reload.call(context)
      })
  }

  deleteBook(id: String, reload: Function, context: any) {
    this.httpClient.delete(`http://localhost:8080/library/books/${id}`)
      .subscribe(res => {
        console.log(res)
        reload.call(context)
      })
  }

  countBooks(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/library/books/count')
  }
}
