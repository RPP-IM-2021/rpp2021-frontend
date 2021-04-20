import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PorudzbinaDialogComponent } from '../dialog/porudzbina-dialog/porudzbina-dialog.component';
import { Dobavljac } from '../model/dobavljac.model';
import { Porudzbina } from '../model/porudzbina.model';
import { PorudzbinaService } from '../service/porudzbina.service';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {

  displayedColumns = ['id', 'dobavljac', 'iznos', 'datum', 'isporuceno', 'placeno', 'actions'];

  //dataSource: Observable<Porudzbina[]>;
  dataSource: MatTableDataSource<Porudzbina>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  currentDate = new Date();

  selektovanaPorudzbina: Porudzbina;

  constructor(public porudzbinaService: PorudzbinaService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.porudzbinaService.getAllPorudzbina();
    this.porudzbinaService.getAllPorudzbina().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'iznos': return data[property];
          case 'dobavljac': return data[property].naziv;
          case 'placeno': return data[property].valueOf();
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, dobavljac: Dobavljac, iznos: number, datum: Date, isporuceno: Date, placeno: boolean ) {
    const dialog = this.dialog.open(PorudzbinaDialogComponent, {data: {id: id, dobavljac: dobavljac, iznos: iznos, datum: datum, isporuceno: isporuceno, placeno: placeno}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row) {
    this.selektovanaPorudzbina = row;
  }

  applyFilter(filterValue: string){
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
