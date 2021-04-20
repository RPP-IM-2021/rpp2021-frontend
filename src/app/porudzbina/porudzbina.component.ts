import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  dataSource: Observable<Porudzbina[]>;

  currentDate = new Date();

  constructor(public porudzbinaService: PorudzbinaService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.porudzbinaService.getAllPorudzbina();
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

}
