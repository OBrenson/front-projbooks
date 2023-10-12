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

  getAuthors(pageNum: number, pageSize: number): Observable<Author[]> {
    return this.httpClient
      .get<Author[]>(`http://localhost:8080/library/authors/get/all/${pageNum}/${pageSize}`)
  }

  getPubls(): Observable<Publ[]> {
    return this.httpClient
      .get<Publ[]>('http://localhost:8080/library/publ/get/all')
  }

  getGenres(): Observable<Genre[]> {
    return this.httpClient
      .get<Genre[]>('http://localhost:8080/library/genre/get/all')
  }

  getSorted<Type>(uri: string, sortBy: string, isDesc: string): Observable<Type[]> {
    if(isDesc === "asc") {
      isDesc = "false"
    } else if (isDesc === "desc") {
      isDesc = "true"
    }
    return this.httpClient
      .get<Type[]>(`http://localhost:8080/library/${uri}/get/all?sortBy=${sortBy}&isDesc=${isDesc}`)
  }

  delete(id: String, uri:string, reload: Function, context: any) {
    this.httpClient.delete(`http://localhost:8080/library/${uri}/${id}`)
      .subscribe(res => {
        console.log(res)
        reload.call(context)
      })
  }

  countBooks(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/library/books/count')
  }

  countAuthors(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/library/authors/count')
  }

  save<Type>(data:Type, uri:string, reload:Function, context: any) {
    this.httpClient.put(`http://localhost:8080/library/${uri}/put`, {"value": [data]})
      .subscribe(res => {
        console.log(res)
        reload.call(context)
      })
  }
}
