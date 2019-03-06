import { Component, OnInit } from '@angular/core';

import { User } from '../model/User';
import { Router } from '@angular/router';
import { PathLocationStrategy } from '@angular/common';

import { LocalComponentsService } from '../services/local/local.components.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { UsersService } from '../services/user.service';

import { HttpResponse } from 'selenium-webdriver/http';
import { isNullOrUndefined } from 'util';
import { Local } from 'protractor/built/driverProviders';
import { LocalStorageService } from '../services/local/local.storage.service';
import { BaseComponent } from './base.components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit  {

  protected user: User;
  protected loginFailed: boolean;
  private isUserLogged = false;



  private login(): void {
    // preparo il json da inviare per il login - sarà il body della request http
    const body = JSON.stringify({
      email: this.user.email,
      password: this.user.password
    });
    this.usersService.login(body).subscribe((resp) => {
      console.log(resp);
      if (resp !== null) {

        this.user.id = (Number)(resp.body);
        this.localStorageService.registerSession(this.user.id);
        this.authService.setUserLogged(true);
        this.authService.setLoggedUser(this.user);
        this.router.navigate(['note-list']);
      }
    });
  }

  getUserLogged(): boolean {
    return this.isUserLogged;
  }

  constructor(protected localStorageService: LocalStorageService,
    protected usersService: UsersService,
    protected localComponentsService: LocalComponentsService,
    protected router: Router,
    protected authService: AuthGuardService
    ) {
       super(localStorageService, usersService, localComponentsService, router, authService);
     }

  ngOnInit() {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
    this.localComponentsService.loginComponent = this;
  }



}
