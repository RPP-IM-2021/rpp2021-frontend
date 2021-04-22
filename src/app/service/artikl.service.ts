import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Artikl } from '../model/artikl.model';

@Injectable()
export class ArtiklService {

  //End Point u Development modu
  //private readonly API_URL = 'http://localhost:8082/artikl/';

  //End Point u Deployment modu
  private readonly API_URL = 'https://rpp-backend.herokuapp.com/artikl/';

  dataChange: BehaviorSubject<Artikl[]> = new BehaviorSubject<Artikl[]>([]);

  constructor(private httpClient: HttpClient) {

  }

  public getAllArtikl(): Observable<Artikl[]> {
    this.httpClient.get<Artikl[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });

    return this.dataChange.asObservable();
  }

  public addArtikl(artikl: Artikl): void {
    this.httpClient.post(this.API_URL, artikl).subscribe();
  }

  public updateArtikl(artikl: Artikl): void {
    this.httpClient.put(this.API_URL + artikl.id, artikl).subscribe();
  }

  public deleteArtikl(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

}
