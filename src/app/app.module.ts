import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { appRouting } from './app.routes';
import { SearchComponent } from './search/search.component';
import { ServiceService } from './service/service.service';
import { SearchPipe } from './pipes/search.pipe';
import { CrudFomComponent } from './crud-fom/crud-fom.component';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchPipe,
    CrudFomComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
