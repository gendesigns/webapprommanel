import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultQuizComponent } from './result-quiz/result-quiz.component';
import { CompartilheComponent } from './compartilhe/compartilhe.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { EditarColecoesComponent } from './editar-colecoes/editar-colecoes.component';
import { MeuCatalogoComponent } from './meu-catalogo/meu-catalogo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quiz', component: QuizComponent, canActivate: [ AuthGuard ] },
    { path: 'quizResultado', component: ResultQuizComponent, canActivate: [ AuthGuard ] },
    { path: 'compartilhe', component: CompartilheComponent, canActivate: [ AuthGuard ] },
    { path: 'editarPerfil', component: EditarPerfilComponent, canActivate: [ AuthGuard ] },
    { path: 'editarMeuCatalogo', component: EditarColecoesComponent, canActivate: [ AuthGuard ] },
    { path: 'meuCatalogo', component: HomeComponent},
    { path: 'meuCatalogo/:id', component: MeuCatalogoComponent},
    { path: 'gerenciador', component: GerenciadorComponent},
    { path: '**', component: NotFoundComponent }
]
