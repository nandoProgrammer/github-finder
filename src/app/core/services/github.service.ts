import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiGithubService {
  BASE_URL:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProfileByUserName(userName: string):Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${userName}`);
  }

  getProfileRepos(userName: string):Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${userName}/repos`);
  }

}
