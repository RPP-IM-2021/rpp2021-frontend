import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StavkaPorudzbineDialogComponent } from '../dialog/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Artikl } from '../model/artikl.model';
import { Porudzbina } from '../model/porudzbina.model';
import { StavkaPorudzbine } from '../model/stavka-porudzbine.model';
import { StavkaPorudzbineService } from '../service/stavka-porudzbine.service';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {

  displayedColumns = ['id', 'porudzbina', 'redniBroj', 'artikl', 'cena', 'jedinicaMere', 'kolicina', 'actions'];

  //dataSource: Observable<StavkaPorudzbine[]>;
  dataSource: MatTableDataSource<StavkaPorudzbine>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  selektovanaPorudzbina: Porudzbina;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges() {
    if (this.selektovanaPorudzbina.id){
      this.loadData();
    }
  }

  public loadData(){
    //this.dataSource = this.stavkaPorudzbineService.getAllStavkaPorudzbine();
    //this.dataSource = this.stavkaPorudzbineService.getStavkaZaPorudzbinu(this.selektovanaPorudzbina.id);
    this.stavkaPorudzbineService.getStavkaZaPorudzbinu(this.selektovanaPorudzbina.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'porudzbina': return data[property].id;
          case 'redniBroj': return data[property];
          case 'artikl': return data[property].naziv;
          case 'cena': return data[property];
          case 'kolicina': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, porudzbina: Porudzbina, redniBroj: number, artikl: Artikl, cena: number, jedinicaMere: number, kolicina: number) {
    const dialog = this.dialog.open(StavkaPorudzbineDialogComponent, {data: {id: id, porudzbina: porudzbina, redniBroj: redniBroj, artikl: artikl, cena: cena, jedinicaMere: jedinicaMere, kolicina: kolicina}});
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
