import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Genre} from "../model/genre";
import {ApiService} from "../api.service";
import {Sort} from "@angular/material/sort";
import {Publ} from "../model/publ";

@Component({
  selector: 'app-publs',
  templateUrl: './publs.component.html',
  styleUrls: ['./publs.component.css']
})
export class PublsComponent implements OnInit{

  private uri = "publ"

  public dataSource = new MatTableDataSource<Genre>()
  public displayedColumns = ['name', 'save', 'delete']


  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadAll()
  }

  public loadAll() {
    this.apiService.getPubls().subscribe(res => {
      res.push({"id": "", "name": ""})
      this.dataSource.data = res
    })
  }

  public save(publ: Publ) {
    this.apiService.save<Publ>(publ, this.uri, this.loadAll, this)
  }

  public delete(id: string) {
    this.apiService.delete(id, this.uri, this.loadAll, this)
  }

  public sortData(sort: Sort) {
    if(!sort.direction) {
      return
    }
    this.apiService.getSorted<Publ>(this.uri, sort.active, sort.direction).subscribe(res => {
      res.push({"id": "", "name": ""})
      this.dataSource.data = res
    })
  }
}
