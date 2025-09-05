import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Usuario } from "../models/usuario.model";
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    // constructor com HttpClient injetado
    constructor(private http: HttpClient) { }

    // Variáveis
    private apiUrl = 'https://cadastro-funcionario-backend.vercel.app/login'
    usuarioLogado = signal<Usuario | null>(null)

    // Função para realizar login e salvar o username no localStorage.
    login(username: string, password: string): Observable<Usuario> {
        return this.http.post<{ user: Usuario }>(this.apiUrl, { username, password }).pipe(
            map(res => res.user),
            tap(user => {
            if (user) {
                this.usuarioLogado.set(user)
                localStorage.setItem('usuario', JSON.stringify(user))
            }
            })
        )
    }

    // Função para obter o username no localstorage, caso username exista, ela pega o JSON salvo no navegador e transforma em objeto
    carregarUsername(): void {
        const username = localStorage.getItem('usuario')
        if(username) {
            this.usuarioLogado.set(JSON.parse(username) as Usuario)
        }
    }

    // Função para deslogar o usuário removendo o username do localStorage
    logout(): void {
        this.usuarioLogado.set(null)
        localStorage.removeItem('usuario')
    }
}
