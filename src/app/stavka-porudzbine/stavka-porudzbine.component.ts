import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  dataSource: Observable<StavkaPorudzbine[]>;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.stavkaPorudzbineService.getAllStavkaPorudzbine();
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

}
