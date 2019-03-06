import { Injectable } from '@angular/core';
import { AppComponent } from '../../components/app.component';
import { LoginComponent } from '../../components/login.component';


@Injectable({
  providedIn: 'root'
})
export class LocalComponentsService {

  loginComponent: LoginComponent;
  root: AppComponent;


  constructor() {}
}
