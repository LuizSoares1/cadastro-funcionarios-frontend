import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Funcionario } from "../models/funcionario.model"

@Injectable({
    providedIn: 'root'
})

// Serviço para gerenciar lista de funcionários e cadastro
export class FuncionarioService {
    // api url
    private apiUrl = 'https://cadastro-funcionario-backend.vercel.app/funcionarios'
    
    // constructor com HttpClient injetado
    constructor(private http: HttpClient) {}

    // Função para carregar dados do backend
    listarFuncionario(): Observable<Funcionario[]> {
        try {
            const funcionarios = this.http.get<Funcionario[]>(this.apiUrl)
            return funcionarios
        } catch (error) {
            console.error('Erro ao lista funcionários:', error)
            throw error
        }
    }
    // Função para salvar os dados no backend
    cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
        try {
            const cadastroFuncionario = this.http.post<Funcionario>(this.apiUrl, funcionario)
            return cadastroFuncionario
        } catch (error) {
            console.error('Erro ao cadastrar funcionário:', error)
            throw error
        }
    }
}