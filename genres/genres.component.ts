import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../model/book";
import {ApiService} from "../api.service";
import {Genre} from "../model/genre";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  private uri = "genre"

  public dataSource = new MatTableDataSource<Genre>()
  public displayedColumns = ['name', 'save', 'delete']


  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadAll()
  }

  public loadAll() {
    this.apiService.getGenres().subscribe(res => {
      res.push({"id": "", "name": ""})
      this.dataSource.data = res
    })
  }

  public save(genre: Genre) {
    this.apiService.save<Genre>(genre, this.uri, this.loadAll, this)
  }

  public delete(id: string) {
    this.apiService.delete(id, this.uri, this.loadAll, this)
  }

  public sortData(sort: Sort) {
    if(!sort.direction) {
      return
    }
    this.apiService.getSorted<Genre>(this.uri, sort.active, sort.direction).subscribe(res => {
      res.push({"id": "", "name": ""})
      this.dataSource.data = res
    })
  }
}
