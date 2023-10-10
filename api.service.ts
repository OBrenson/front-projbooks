import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "./model/book";
import {AuthenticationService} from "./login/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) { }

  getBooks(pageNum: number): Observable<Book[]> {
    return this.httpClient
      .get<Book[]>(`http://localhost:8080/library/books/get/all/${pageNum}/5`)
  }
}
