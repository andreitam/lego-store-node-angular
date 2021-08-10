import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { switchMap, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getDataArrayBuffer(url: string): Observable<string> {
    return this.httpClient.get(url, { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFileArrayBuffer(response))
      );
  }

  getDataAsDastaUrl(url: string): Observable<string> {
    return this.httpClient.get(url, { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFileADataUrl(response))
      );
  }

  private readFileArrayBuffer(blob: Blob): Observable<string> {
    return Observable.create(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsArrayBuffer(blob);
    });
  }

  private readFileADataUrl(blob: Blob): Observable<string> {
    return Observable.create(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
}
