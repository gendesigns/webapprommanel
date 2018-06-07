import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2/index';
import { FirebaseConfig } from './../environments/firebase.config';

import { SafePipeModule } from 'safe-pipe';

import { ROUTES } from './app.routes';

import { Bd } from './bd.service'
 
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultQuizComponent } from './result-quiz/result-quiz.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';

import { Auth } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { HomeComponent } from './home/home.component';
import { InstitucionalComponent } from './home/institucional/institucional.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { CompartilheComponent } from './compartilhe/compartilhe.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MeuCatalogoComponent } from './meu-catalogo/meu-catalogo.component';

import { FacebookModule } from 'ngx-facebook';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { FotoDoPerfilComponent } from './foto-do-perfil/foto-do-perfil.component';
import { EditarColecoesComponent } from './editar-colecoes/editar-colecoes.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { PaginaComponent } from './personalize/pagina/pagina.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultQuizComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    InstitucionalComponent,
    HeaderComponent,
    FooterComponent,
    PersonalizeComponent,
    CompartilheComponent,
    UsuarioComponent,
    MeuCatalogoComponent,
    NotFoundComponent,
    EditarPerfilComponent,
    FotoDoPerfilComponent,
    EditarColecoesComponent,
    NotificacoesComponent,
    PaginaComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    SafePipeModule,
    NgPipesModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    FacebookModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [ Auth, AuthGuard, Bd ],
  bootstrap: [AppComponent]
})
export class AppModule { }
