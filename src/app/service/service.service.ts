import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/UsuarioModel';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private usuarios: Usuario[];
  private usuarios$: Subject<Usuario[]>;

  private usuario: Usuario;
  private usuario$: Subject<Usuario>;
  private validar: string;

  constructor(private http: HttpClient) {
    this.usuarios = [];
    this.usuarios$ = new Subject<Usuario[]>();
    this.usuario = new Usuario;
    this.usuario$ = new Subject();
    this.validar = "";
  }

  getUserUrl="http://localhost:8080/prueba/usuarios";
  postUserUrl="http://localhost:8080/prueba/"
  
  //Petición HTTP para obtener todos los usuarios
  getUsers(){
    this.http.get<Usuario[]>(this.getUserUrl).subscribe(data => {
      this.usuarios = data;
      this.usuarios$.next(this.usuarios);
    });
  }
  getObsUsers(): Observable<Usuario[]>{
    this.getUsers();
    return this.usuarios$.asObservable();
  }
  
  //Petición HTTP para obtener un usuario por id
  searchUserByID(id:string){
    return this.http.get("http://localhost:8080/prueba/usuario/"+id);
  }
  
  //Peticiónes HTTP para crear un usuario
  createUser(user:Usuario){
    
    this.usuarios.forEach(usuario => {
      if(usuario.nombre === user.nombre) {
        this.validar = "no valido";
      }
    });

    if(this.validar == ""){
      this.http.post<Usuario>(this.postUserUrl, user).subscribe(data =>{
        this.usuarios.push(data);
        this.usuarios$.next(this.usuarios);
      });
    }else if(this.validar == "no valido"){
      alert("Dos usuarios no pueden tener el mismo nombre");
    }
    

  }
  
  addUserToObs(pUsuario: Usuario){
    this.usuario = pUsuario;
    this.usuario$.next(this.usuario);
  }

  getUser$(): Observable<Usuario>{
    return this.usuario$.asObservable();
  }

  //Petición HTTP para editar usuario por id

  updateUser(pUsuario: Usuario){
    this.http.put("http://localhost:8080/prueba/actualizar/"+pUsuario.id?.toString(), pUsuario).subscribe(response=>{
      this.getUsers();
    });

  }
  
  //Petición HTTP para eliminar usuario por ID
  deleteUser(pUsuario: Usuario){
    this.http.delete("http://localhost:8080/prueba/eliminar/"+pUsuario.id).subscribe(response =>{
      this.getUsers();
    });
  }
}
