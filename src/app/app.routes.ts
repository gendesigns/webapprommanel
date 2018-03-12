import { Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultQuizComponent } from './result-quiz/result-quiz.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { MeuCatalogoComponent } from './meu-catalogo/meu-catalogo.component';
import { CompartilheComponent } from './compartilhe/compartilhe.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quiz', component: QuizComponent, canActivate: [ AuthGuard ] },
    { path: 'compartilhe', component: CompartilheComponent, canActivate: [ AuthGuard ] },
    { path: 'editarPerfil', component: EditarPerfilComponent, canActivate: [ AuthGuard ] },
    { path: 'quizResultado', component: ResultQuizComponent, canActivate: [ AuthGuard ] },
    { path: 'meuCatalogo', component: HomeComponent},
    { path: 'meuCatalogo/:id', component: MeuCatalogoComponent},
    { path: '**', component: NotFoundComponent }
]
