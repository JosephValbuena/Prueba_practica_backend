import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/UsuarioModel';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  
  modelUsuario = new Usuario();
  idUsuario: string = "";

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getUser$().subscribe(usuario => {
      this.modelUsuario = usuario;
      
    })
  }
  
  updateUser(){
    this.service.updateUser(this.modelUsuario);
  }

  deleteUser(){
    this.service.deleteUser(this.modelUsuario);
    this.modelUsuario.id="";
    this.modelUsuario.rol=0;
    this.modelUsuario.nombre="";
  }

  radioChangeHandle(event: any){
    this.modelUsuario.activo = event.target.value; 
  }

}
