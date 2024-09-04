import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialService } from '../../services/material.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent {
  constructor(
    private snackbar:MatSnackBar,
    private materialService:MaterialService
  ){
    this.buscaMaterial()
  }

  //inicializa o material
material:FormGroup = new FormGroup({
  id:new FormControl(null),
  nome:new FormControl('',Validators.required ),
  valor:new FormControl('',Validators.required ),
  tipo:new FormControl('',Validators.required ),
  fornecedor:new FormControl('',Validators.required ),

  

})

//metodos dos controles do material

onIncluir(){
  //guarda as informações em uma variavel para melhorar o acesso
   this.material.reset();
   this.material.enable();
}

onSalvar(){
    //guarda as informações em uma variavel para melhorar o acesso
    let info = this.material.value;
    
    //verifica se está inserindo ou alterendo com base no valor
    //do ID (se for null, está inserindo, senão está alterando)
    if(info.id==null){
      //Irá inserir no banco de dados um usuário
console.log(info)
       this.materialService.addMaterial(info).subscribe({
        next:(resposta)=>{
          console.log(resposta);

          this.snackbar.open(
            "material adicionado com sucesso",
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
  this.material.reset();
  this.material.disable();
}



// Função para busca as  informações e usuários

relatorio:any[] = [];

buscaMaterial(){
 this.materialService.getMaterial().subscribe({
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
