import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})

export class ProdutoComponent{
  constructor(
    private snackbar:MatSnackBar,
    private produtoService:ProdutoService
  ){
    this.buscaProduto()
  }

  //inicializa o produto
produto:FormGroup = new FormGroup({
  id:new FormControl(null),
  descricao:new FormControl('',Validators.required ),
  unidade_medida:new FormControl('',Validators.required ),
  tipo:new FormControl('',Validators.required ),
  valor:new FormControl('',Validators.required ),

  

})

//metodos dos controles do produto

onIncluir(){
  //guarda as informações em uma variavel para melhorar o acesso
   this.produto.reset();
   this.produto.enable();
}

onSalvar(){
    //guarda as informações em uma variavel para melhorar o acesso
    let info = this.produto.value;
    
    //verifica se está inserindo ou alterendo com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if(info.id==null){
      //Irá inserir no banco de dados um usuário
console.log(info)
       this.produtoService.addProduto(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);

          this.snackbar.open(
            "produto adicionado com sucesso",
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
  this.produto.reset();
  this.produto.disable();
}



// Função para busca as  informações e usuários

relatorio:any[] = [];

buscaProduto(){
 this.produtoService.getProduto().subscribe({
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
