import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Title } from "@angular/platform-browser";

// Componente para o dashboard principal
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  // Construtores
  constructor(
    private authService: AuthService, 
    private router: Router,
    private titleService: Title
  ) {}

  // Titulo da aba
  Title: string = 'Dashboard - Sistema de Cadastro de Funcionários'

  // Função utilizada para setar o título da aba e carregar o nome do usuário logado na header.
  ngOnInit(): void {
    this.titleService.setTitle(this.Title)
    this.authService.carregarUsername()
  }

  // Função para retornar o username na header.  
  get usuarioLogado() {
    return this.authService.usuarioLogado
  }

  // Função para rotas dos menus.
  navegarPara(path: string): void {
    if(path == '/login'){
      this.authService.logout()
    }
    this.router.navigate([path])
  }
}
