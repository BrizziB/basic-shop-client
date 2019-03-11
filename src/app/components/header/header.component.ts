import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../app/base.components';
import { LocalComponentsService } from '../../services/local/local.components.service';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local/local.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(protected localStorageService: LocalStorageService,
    protected usersService: UserService,
    protected localComponentsService: LocalComponentsService,
    protected router: Router,
    protected authService: AuthGuardService
    ) {
      super(localStorageService, usersService, localComponentsService, router, authService);
  }

  ngOnInit() {
  }

}
