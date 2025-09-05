import { Component, signal, computed } from "@angular/core";
import { FuncionarioService } from "../../core/services/funcionario.service";
import { Funcionario } from "../../core/models/funcionario.model";
import { FormsModule } from "@angular/forms";
import { CepService } from "../../core/services/cep.service";
import { NgxMaskDirective } from "ngx-mask";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { UploadService } from "../../core/services/upload.service";

// Componente para cadastro de funcionários
// Utiliza FuncionarioService para gerenciar funcionários e CepService para buscar endereço via CEP
// Usa FormsModule para data binding com formulários e NgxMaskDirective para máscaras de input
@Component({
    selector: 'app-cadastro',
    standalone: true,
    imports: [FormsModule, NgxMaskDirective],
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent {

    // Método para criar uma instancia de funcionario com os valores padrão
    private criarFuncionarioInicial(): Funcionario {
        return {
            id: 0,
            ativo: true,
            foto: '',
            nome: '',
            email: '',
            dataContratacao: new Date(),
            cpf: '',
            endereco: {
                rua: '',
                cep: '',
                bairro: '',
                cidade: '',
                estado: ''
            }
        }
    }

    // Variaveis
    funcionario = signal<Funcionario>(this.criarFuncionarioInicial())
    erro = signal<string>('')
    temFoto = computed(() => !!this.funcionario().foto)
    Title: string = 'Cadastro de Funcionários - Sistema de Cadastro de Funcionários'
    loading: boolean = false
    loadingFoto: boolean = false

    // Construtores
    constructor(
        private funcionarioService: FuncionarioService,
        private cepService: CepService,
        private router: Router,
        private titleService: Title,
        private uploadService: UploadService
    ) {}
    
    // Função utilizada para setar o título da página
    ngOnInit(): void {
        this.titleService.setTitle(this.Title)
    }

    // Função para pegar a imagem que o usuário selecionou e enviar para imgBB
    async arquivoFoto(event: Event) {
        const input = event.target as HTMLInputElement
        const file = input?.files?.[0]
        if (!file) return

        this.loadingFoto = true

        try {
            const url = await this.uploadService.uploadParaImgBB(file)
            this.funcionario.update(f => ({ ...f, foto: url }))
        } catch {
            this.erro.set('Erro ao enviar imagem para o ImgBB.')
        } finally{
            this.loadingFoto = false
        }
    }

    // Função para buscar endereço via CEP
    // Ele verifica se o CEP está vazio, caso ao contrário, ele preenche os campos do html, se não ele retorna um erro e não preenche os campos.
    buscarEndereco(): void {
        const cep = this.funcionario().endereco.cep
        if (!cep) return
        this.cepService.buscarCep(cep).subscribe(dados => {
            if (!dados.erro) {
                this.funcionario.update(f => ({
                    ...f, endereco: {
                        ...f.endereco,
                        rua: dados.logradouro,
                        bairro: dados.bairro,
                        cidade: dados.localidade,
                        estado: dados.uf
                    }
                })) 
            } else {
                this.erro.set('CEP não encontrado.')
            }
        })
    }
    
    // Função para cadastrar funcionário.
    // possui uma validação para os campos obrigatórios e também chama o serviço de cadastro do funciário.
    cadastrarFuncionario(): void {
        const f = this.funcionario()
        if (!f.nome || !f.email || !f.cpf || !f.dataContratacao || !f.endereco.cep || !f.endereco.cidade || !f.endereco.estado ) {
            this.erro.set('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        this.loading = true

        this.funcionarioService.cadastrarFuncionario(f).subscribe({
            next: () => {
                this.funcionario.set(this.criarFuncionarioInicial())
                this.loading = false
                this.router.navigate(['/funcionarios/lista'])
            },
            error: () => {
                this.erro.set('Erro ao cadastrar funcionário')
                this.loading = false
            }
        })
    }

    // Função para voltar para a dashboard
    btnVoltar(): void {
        this.router.navigate(['/dashboard'])
    }
}