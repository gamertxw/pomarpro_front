import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimentoService,  } from '../services/movimento.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.scss'
})
export class MovimentoComponent {

  constructor(
    private snackbar:MatSnackBar,
    private movimentoService:MovimentoService
  ){
    this.buscaMovimento()
  }

  //inicializa o movimento
movimento:FormGroup = new FormGroup({
  id:new FormControl(null),
  tipo:new FormControl('',Validators.required ),
  produto:new FormControl('',Validators.required ),
  quantidade:new FormControl('',Validators.required ),
  
  

})

//metodos dos controles do movimento

onIncluir(){
  //guarda as informações em uma variavel para melhorar o acesso
   this.movimento.reset();
   this.movimento.enable();
}

onSalvar(){
    //guarda as informações em uma variavel para melhorar o acesso
    let info = this.movimento.value;
    
    //verifica se está inserindo ou alterendo com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if(info.id==null){
      //Irá inserir no banco de dados um usuário
console.log(info)
       this.movimentoService.addMovimento(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);

          this.snackbar.open(
            "movimento adicionado com sucesso",
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
  this.movimento.reset();
  this.movimento.disable();
}



// Função para busca as  informações e usuários

relatorio:any[] = [];

buscaMovimento(){
 this.movimentoService.getMovimento().subscribe({
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
