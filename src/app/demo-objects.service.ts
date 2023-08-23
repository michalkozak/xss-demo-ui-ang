import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DemoObject, FileObject } from './demo-objects.interface';

var apiUrl = "http://localhost:8080/api";

var httpLink = {
  demos: apiUrl + "/demos",
  uploads: apiUrl + "/uploads",
}

@Injectable({
  providedIn: 'root'
})
export class DemoObjectsService {

  constructor(
      private httpClient: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    })
  }

  public getDemoObjects(): Observable<any> {
    return this.httpClient.get(httpLink.demos, this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public getDemoObject(id: number): Observable<any> {
    return this.httpClient.get(httpLink.demos + '/' + id, this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public addDemoObject(demoObject: DemoObject): Observable<any> {
    return this.httpClient.post(httpLink.demos, JSON.stringify(demoObject), this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public initUpload(fileObject: FileObject): Observable<any> {
    return this.httpClient.post(httpLink.uploads, JSON.stringify(fileObject), this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public uploadDemoObject(uploadId: string, file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(httpLink.demos + '/' + uploadId, formData)
    .pipe(catchError(this.handleError))
  }

  private handleError(error: any) {
    // TODO error handling
    return throwError(() => new Error("HTTP error BAD REQUEST"));
  }

}