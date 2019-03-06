import { Injectable } from '@angular/core';
import { AppComponent } from '../../components/app/app.component';
import { LoginComponent } from '../../components/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class LocalComponentsService {

  loginComponent: LoginComponent;
  root: AppComponent;


  constructor() {}
}
