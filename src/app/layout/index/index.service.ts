import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private getInfoUrl: string = 'http://localhost:8080/admin/dashboard';
  constructor(private http: HttpClient) { }
  getInfo() {
    return this.http.get<string>(this.getInfoUrl).subscribe((response) => {
      console.log(response);
    });
  }
}
