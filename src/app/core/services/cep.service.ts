import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Serviço para consultar CEP via API externa (ex: ViaCEP)
@Injectable({
  providedIn: 'root'
})
export class CepService {
    private apiUrl = 'https://viacep.com.br/ws'

    constructor(private http: HttpClient) {}

    buscarCep(cep: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${cep}/json/`)
    }
}