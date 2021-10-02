import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';



const routes: Routes = [
    { path: 'prueba', component: AppComponent },
    { path: '**', pathMatch:'full', redirectTo: 'prueba' }
];

export const appRouting = RouterModule.forRoot(routes);