import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DobavljacDialogComponent } from '../dialog/dobavljac-dialog/dobavljac-dialog.component';
import { Dobavljac } from '../model/dobavljac.model';
import { DobavljacService } from '../service/dobavljac.service';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {

  displayedColumns = ['id', 'adresa', 'kontakt', 'naziv', 'actions'];

  //dataSource: Observable<Dobavljac[]>;
  dataSource: MatTableDataSource<Dobavljac>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public dobavljacService: DobavljacService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.dobavljacService.getAllDobavljac();
    this.dobavljacService.getAllDobavljac().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, adresa: string, kontakt: string, naziv: string) {
    const dialog = this.dialog.open(DobavljacDialogComponent, {data: {id: id, adresa: adresa, kontakt: kontakt, naziv: naziv}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string){
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
