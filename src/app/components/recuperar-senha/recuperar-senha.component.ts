import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {

  //atributos
  mensagem: string = "";

  //construtor
  constructor(
    private HttpClient: HttpClient, //injeção de dependência
    private spinner: NgxSpinnerService //inicialização automática
  ) {

  }



  //objeto para capturar o formulário
  formRecuperarSenha = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.email]),
  });

  //objeto para executar as validações dos campos
  get form(): any {
    return this.formRecuperarSenha.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    
    this.HttpClient.post(
      environment.apiUsuarios + "api/RecuperarSenha",
      this.formRecuperarSenha.value
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.mensagem;
          this.formRecuperarSenha.reset();

        },
        error: (e) => {
          this.mensagem = e.error.mensagem;

        }
      }).add(
        () => {
          this.spinner.hide();
        })
  }


  // teste:string = "teste123";


}
