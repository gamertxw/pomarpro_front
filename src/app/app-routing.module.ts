import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadUsuarioComponent } from './pages/usuario/cad-usuario/cad-usuario.component';
import { MaterialComponent } from './pages/material/material.component';
import { ProdutoComponent } from './produto/produto.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MovimentoComponent } from './movimento/movimento.component';
import { colheitaComponent } from './colheita/colheita.component';
import { ArvoreComponent } from './arvore/arvore.component';



const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'cadUsuario',component:CadUsuarioComponent},
  {path:'material', component:MaterialComponent},
  {path:'produto', component:ProdutoComponent},
  {path:'cadastro', component:CadastroComponent},
  {path:'movimento', component:MovimentoComponent},
  {path:'colheita', component:colheitaComponent},
  {path:'arvore', component:ArvoreComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
