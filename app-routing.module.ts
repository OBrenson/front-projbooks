import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MenuComponent} from "./menu/menu.component";
import {BooksComponent} from "./books/books.component";
import {PublsComponent} from "./publs/publs.component";
import {AuthorsComponent} from "./authors/authors.component";
import {GenresComponent} from "./genres/genres.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'books', component: BooksComponent},
    {path: 'publs', component: PublsComponent},
    {path: 'authors', component: AuthorsComponent},
    {path: 'genres', component: GenresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
