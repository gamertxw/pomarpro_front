import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../services/produto.service';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})


export class CadastroComponent {


  constructor(
    private snackbar:MatSnackBar,
    private cadastroService:CadastroService
  ){
    this.buscaCadastro()
  }

  //inicializa o cadastro
cadastro:FormGroup = new FormGroup({
  id:new FormControl(null),
  apelido:new FormControl('',Validators.required ),
  num_linha:new FormControl('',Validators.required ),
  num_coluna:new FormControl('',Validators.required ),
  

  

})

//metodos dos controles do cadastro

onIncluir(){
  //guarda as informações em uma variavel para melhorar o acesso
   this.cadastro.reset();
   this.cadastro.enable();
}

onSalvar(){
    //guarda as informações em uma variavel para melhorar o acesso
    let info = this.cadastro.value;
    
    //verifica se está inserindo ou alterendo com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if(info.id==null){
      //Irá inserir no banco de dados um usuário
console.log(info)
       this.cadastroService.addCadastro(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);

          this.snackbar.open(
            "cadastro adicionado com sucesso",
            "ok",
            {
              verticalPosition:'top',
              horizontalPosition:'end',
              duration:3000
            }
          )
          this.onCancelar()
        },

        error:(erro)=>{
          console.log(erro);
          this.snackbar.open(
            "algo deu errado",
            "ok",
            {
              verticalPosition:'top',
              horizontalPosition:'end',
              duration:3000
            }
          )

         }
       })
    }else{
      //Irá alterar o usuário no banco de dados

    }
}

onCancelar(){
  this.cadastro.reset();
  this.cadastro.disable();
}



// Função para busca as  informações e usuários

relatorio:any[] = [];

buscaCadastro(){
 this.cadastroService.getCadastro().subscribe({
   next:(resposta)=>{
     console.log(resposta);
     this.relatorio = resposta.body;
   },
   error:(erro)=>{
     console.log(erro);
   }
 })
}

}
