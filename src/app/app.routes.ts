import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroComponent } from './funcionarios/cadastro/cadastro.component';
import { ListaComponent } from './funcionarios/lista/lista.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'funcionarios/cadastro', component: CadastroComponent },
    { path: 'funcionarios/lista', component: ListaComponent }
];
