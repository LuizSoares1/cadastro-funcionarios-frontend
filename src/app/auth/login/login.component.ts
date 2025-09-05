import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";

// Componente para realizar login
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {  

    // Construtores
    constructor(
        private authService: AuthService,
        private router: Router,
        private titleService: Title
    ) {}

    // Variáveis
    usuario: string = ''
    senha: string = ''
    erro: string = ''
    loading: boolean = false
    Title = 'Login - Sistema de Cadastro de Funcionários'

    // Função para setar o título na Aba.
    ngOnInit(): void {
        this.titleService.setTitle(this.Title)
    }
    
    // Função para realizar login
    // Se login for bem sucedido, navega para /funcionarios
    // Senão, seta mensagem de erro
    realizarLogin(): void {
        // Validação simples para campos vazios
        if (!this.usuario || !this.senha) {
            this.erro = 'Por favor, preencha usuário e senha.'
            return
        }

        this.loading = true

        // Chama serviço de autenticação
        this.authService.login(this.usuario, this.senha).subscribe({
            next : () => {
                this.router.navigate(['/dashboard'])
                this.loading = false
            },
            error: () => {
                this.erro = 'Usuário ou senha inválidos.'
                this.loading = false
            }
        })
    }
}