import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { isNullOrUndefined } from 'util';
import { InfoFormComponent } from './info-form.component';
import { LocalStorageService } from '../../services/local/local.storage.service';


@Component({
  selector: 'app-info-form-second',
  templateUrl: './info-form-second.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormSecondComponent extends InfoFormComponent implements OnInit {

  constructor(
    protected userService: UserService,
    protected localStorageService: LocalStorageService,
    protected router: Router ) {
    super(userService, localStorageService, router);
  }


}
