import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { SCRIPTS } from './shared/mock-scripts';
import { Script } from './shared/Script';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { scrypt } from 'crypto';

@Injectable({ providedIn: 'root' })
export class ScriptService {
  private scriptsUrl = 'api/scripts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getScripts(): Observable<Script[]> {
    return this.http.get<Script[]>(this.scriptsUrl);
  }

  upDateScript(script: Script): Observable<any> {
    return this.http.put(this.scriptsUrl, script, this.httpOptions);
  }

  getScript(id: number): Observable<Script> {
    const url = `${this.scriptsUrl}/${id}`;
    return this.http.get<Script>(url);
  }

  addScript(script: Script): Observable<Script> {
    return this.http.post<Script>(this.scriptsUrl, script, this.httpOptions)       
  }

  deleteScript(script: Script | number): Observable<Script> {
    const id = typeof script === 'number' ? script : script.id;
    const url = `${this.scriptsUrl}/${id}`;

    return this.http.delete<Script>(url, this.httpOptions)
  }
 /* getScript(id: number): Observable<Script> {
    return of(SCRIPTS.find(script => script.id === id))
  }*/

}


  //getScripts(): Observable<Script[]> {    
  //  return this.http.get<Script[]>(this.scriptsUrl + '/push')
  //}

  //http.post<WeatherForecast[]> (heroesUrl + '/create').subscribe(result => {
  //  return = result;
  //}
