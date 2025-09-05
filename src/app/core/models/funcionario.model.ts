export interface Endereco {
    rua: string
    cep: string
    bairro: string
    cidade: string
    estado: string
}

export interface Funcionario {
    id: number
    ativo: boolean
    foto: string
    nome: string
    email: string
    dataContratacao: Date | null
    cpf: string
    endereco: Endereco
}