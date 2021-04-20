import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StavkaPorudzbineService } from 'src/app/service/stavka-porudzbine.service';
import { Artikl } from 'src/app/model/artikl.model';
import { Porudzbina } from 'src/app/model/porudzbina.model';
import { ArtiklService } from 'src/app/service/artikl.service';
import { StavkaPorudzbine } from 'src/app/model/stavka-porudzbine.model';
import { PorudzbinaService } from 'src/app/service/porudzbina.service';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit {

  public flag: number;

  artikli: Artikl[];
  porudzbine: Porudzbina[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: StavkaPorudzbine,
              public stavkaPorudzbineService: StavkaPorudzbineService ,
              public artiklService: ArtiklService,
              public porudzbinaService: PorudzbinaService) { }

  ngOnInit(): void {
    this.artiklService.getAllArtikl().subscribe(artikli =>
      this.artikli = artikli);
      this.porudzbinaService.getAllPorudzbina().subscribe(porudzbine =>
      this.porudzbine = porudzbine);
  }

  public add(): void {
    this.stavkaPorudzbineService.addStavkaPorudzbine(this.data);
    this.snackBar.open('Uspešno dodata stavka porudžbine broj ' + this.data.redniBroj, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.stavkaPorudzbineService.updateStavkaPorudzbine(this.data);
    this.snackBar.open('Uspešno izmenjena stavka porudžbine broj ' + this.data.redniBroj, "Uredu", {duration: 2000});
  }

  public delete(): void {
    this.stavkaPorudzbineService.deleteStavkaPorudzbine(this.data.id);
    this.snackBar.open("UspeŠno obrisana stavka porudžbine broj ' " + this.data.redniBroj, "Uredu", {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'Uredu', {duration:2000});
  }



  compareTo(a, b) {
    return a.id === b.id;
  }

}
