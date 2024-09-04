import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }


public addHome(info:any):Observable<any>{
  return this.http.post
  ('http://localhost:3000/home/add',
      {info},
    {observe:'response'}

  )
}

//Função de busca de usuários
public getHome():Observable<any>{
  return this.http.get
  ('http://localhost:3000/home/buscaTodos',
    {observe:'response'}
  )
}

}