import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtiklService } from 'src/app/service/artikl.service';
import { Artikl } from 'src/app/model/artikl.model';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ArtiklDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Artikl,
              public artiklService: ArtiklService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.artiklService.addArtikl(this.data);
    this.snackBar.open('Uspešno dodat artikl ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.artiklService.updateArtikl(this.data);
    this.snackBar.open('Uspešno izmenjen artikl ' + this.data.naziv, "Uredu", {duration: 2000});
  }

  public delete(): void {
    this.artiklService.deleteArtikl(this.data.id);
    this.snackBar.open("UspeŠno obrisan artikl ' " + this.data.id, "Uredu", {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", 'Uredu', {duration:2000});
  }

}
