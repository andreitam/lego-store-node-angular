import { Injectable } from '@angular/core';
import { Theme } from '../types/theme';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private themeUrl = 'http://localhost:5000/themes';

  constructor(private http: HttpClient) { }

    /** GET themes from the server */
  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themeUrl)
      .pipe(
        tap(_ => console.log('fetched themes')),
      );
  }

    /** GET theme by id. Return `undefined` when id not found */
  getTheme(id: number): Observable<Theme> {
        const url = `${this.themeUrl}/${id}`;
        return this.http.get<Theme[]>(url)
          .pipe(
            map(themes => themes[0]), // returns a {0|1} element array
            tap(_ => console.log(`fetched theme id=${id}`))
          );
  }
}
