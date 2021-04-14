import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Artikl } from '../model/artikl.model';

@Injectable()
export class ArtiklService {

  private readonly API_URL = 'http://localhost:8082/artikl';

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

}
