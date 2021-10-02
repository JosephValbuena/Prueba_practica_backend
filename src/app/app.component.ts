import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Usuario } from './model/UsuarioModel';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'pruebaPractica';
  usuarios: Usuario[] | undefined;
  modelUsuario = new Usuario();
  catchSearch:String | undefined;
  search = new FormControl('');
  filtro_valor= "";
  validator="";


  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.service.getObsUsers().subscribe(users => {
      this.usuarios = users;
    });

    this.search.valueChanges
    .pipe(
      debounceTime(200)
    )
    .subscribe(value => this.filtro_valor = value);

  }

  handleSearch(value: string){
    this.filtro_valor = value;
  }
  
  radioChangeHandle(event: any){
    this.modelUsuario.activo = event.target.value; 
  }


  getUser(event: any){
    console.log(event.target.value);
    this.service.searchUserByID(event.target.value).subscribe((usuario:any) =>{
      this.service.addUserToObs(usuario);
    });
    this.validator="editar";
  }



  

}
