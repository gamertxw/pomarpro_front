import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../services/produto.service';
import { colheitaService } from '../services/colheita.service';

@Component({
  selector: 'app-colheita',
  templateUrl: './colheita.component.html',
  styleUrl: './colheita.component.scss'
})

export class colheitaComponent{
  constructor(
    private snackbar:MatSnackBar,
    private colheitaService:colheitaService
  ){
    this.buscaColheita()
  }

  //inicializa o colheita
colheita:FormGroup = new FormGroup({
  id:new FormControl(null),
  quantidade:new FormControl('',Validators.required ),
  dt_colheita:new FormControl('',Validators.required ),
  arvore:new FormControl('',Validators.required ),


  

})

//metodos dos controles do colheita

onIncluir(){
  //guarda as informações em uma variavel para melhorar o acesso
   this.colheita.reset();
   this.colheita.enable();
}

onSalvar(){
    //guarda as informações em uma variavel para melhorar o acesso
    let info = this.colheita.value;
    
    //verifica se está inserindo ou alterendo com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if(info.id==null){
      //Irá inserir no banco de dados um usuário
console.log(info)
       this.colheitaService.addColheita(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);

          this.snackbar.open(
            "colheita adicionado com sucesso",
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
  this.colheita.reset();
  this.colheita.disable();
}



// Função para busca as  informações e usuários

relatorio:any[] = [];

buscaColheita(){
 this.colheitaService.getColheita().subscribe({
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
