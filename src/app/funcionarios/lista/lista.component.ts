import { Component, OnInit, signal } from "@angular/core";
import { Data, Router } from "@angular/router";
import { FuncionarioService } from "../../core/services/funcionario.service";
import { Funcionario } from "../../core/models/funcionario.model";
import { Title } from "@angular/platform-browser";

// Componente para listar funcionários cadastrados.

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

    // Construtores
    constructor(
        private funcionarioService: FuncionarioService,
        private router: Router,
        private titleService: Title
    ) {}

    // Variaveis
    funcionarios = signal<Funcionario[]>([])
    Title: string = 'Lista - Sistema de Cadastro de Funcionários'
    loading: boolean = false
    temFoto: boolean = false

    // Função utilizada para seta o título da aba e também chamar a função de carregar a lista de usuários
    ngOnInit(): void {
        this.titleService.setTitle(this.Title)
        this.carregarFuncionarios()
    }

    // Função para carregar funcionários do backend via serviço e ordenar pelos últimos adicionados
    carregarFuncionarios(): void {
      this.loading = true
      this.funcionarioService.listarFuncionario().subscribe({
        next: (dados) => {
          const ordenados = [...dados].sort((a, b) => b.id - a.id)
          this.funcionarios.set(ordenados)
          this.loading = false
        },
        error: (err) => {
          console.error('Erro ao carregar funcionário', err)
          this.loading = true
        } 
      })
    }

    // Função para formatar CPF no padrão xxx.xxx.xxx-xx.
    formatarCPF(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    // Função para formatar CEP no padrão xxxxx-xxx.
    formatarCEP(cep: string ): string {
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
    }

    // Função para formatar o enderenção entregando o padrão "CEP - Rua, Bairro, Cidade - Estado".
    formatarEndereco(endereco: any): string {
      return `${this.formatarCEP(endereco.cep)} - ${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`
    }

    // Função para navegar de volta ao dashboard.
    botaoVoltar(): void {
        this.router.navigate(['/dashboard'])
    }
}
