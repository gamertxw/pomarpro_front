import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../services/produto.service';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { ArvoreService } from '../services/arvore.service';

@Component({
  selector: 'app-arvore',
  templateUrl: './arvore.component.html',
  styleUrl: './arvore.component.scss'
})


export class ArvoreComponent {


  constructor(
    private snackbar:MatSnackBar,
    private arvoreService:ArvoreService
  ){
    this.buscaArvore()
  }

  //inicializa o arvore
arvore:FormGroup = new FormGroup({
  id:new FormControl(null),
  defensivo:new FormControl('',Validators.required ),
  fertilizante :new FormControl('',Validators.required ),
 ultima_verif:new FormControl('',Validators.required ),
 linha:new FormControl('',Validators.required ),
 coluna:new FormControl('',Validators.required ),
 tipo:new FormControl('',Validators.required ),
 situacao:new FormControl('',Validators.required ),
 pomar:new FormControl('',Validators.required ),
  

  

})

//metodos dos controles do arvore

onIncluir(){
  //guarda as informações em uma variavel para melhorar o acesso
   this.arvore.reset();
   this.arvore.enable();
}

onSalvar(){
    //guarda as informações em uma variavel para melhorar o acesso
    let info = this.arvore.value;
    
    //verifica se está inserindo ou alterendo com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if(info.id==null){
      //Irá inserir no banco de dados um usuário
console.log(info)
       this.arvoreService.addArvore(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);

          this.snackbar.open(
            "arvore adicionado com sucesso",
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
  this.arvore.reset();
  this.arvore.disable();
}



// Função para busca as  informações e usuários

relatorio:any[] = [];

buscaArvore(){
 this.arvoreService.getArvore().subscribe({
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
