import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Usuario } from '../model/UsuarioModel';

@Component({
  selector: 'app-crud-fom',
  templateUrl: './crud-fom.component.html',
  styleUrls: ['./crud-fom.component.css']
})
export class CrudFomComponent implements OnInit {

  modelUsuario = new Usuario();
  
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
  }

  createUser() {
    this.service.createUser(this.modelUsuario);

    this.service.getUsers();
  }

  radioChangeHandle(event: any){
    this.modelUsuario.activo = event.target.value; 
  }

}
