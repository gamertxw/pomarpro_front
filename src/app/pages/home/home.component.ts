import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HomeService} from '../../services/home.service';



@Component({
  selector:'app-produto',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent{
  constructor(
    private HomeService:HomeService,
    private snackbar:MatSnackBar
  ){
    this.buscaHome();
  }
  relatorio:any[] = [];
  buscaHome(){
    this.HomeService.getHome().subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.relatorio = resposta.body;
      },
      error:(erro)=>{
        console.log(erro)
      }
    })
  }
}