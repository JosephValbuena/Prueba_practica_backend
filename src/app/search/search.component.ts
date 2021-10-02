import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { Usuario } from '../model/UsuarioModel';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //
  usuarios: Usuario[] | undefined;
  search = new FormControl('');
  
  @Output('search') searchEmitter = new EventEmitter<string>();


  constructor(private service:ServiceService) { }
  
  ngOnInit(): void {
    this.search.valueChanges
    .pipe(
      debounceTime(200)
    )
    .subscribe(value => this.searchEmitter.emit(value));

  }

  clean(){
    this.search.setValue("");
  }
  


}
