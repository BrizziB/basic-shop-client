import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { isNullOrUndefined } from 'util';
import { InfoFormComponent } from './info-form.component';

@Component({
  selector: 'app-info-form-first',
  templateUrl: './info-form-first.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormFirstComponent extends InfoFormComponent implements OnInit {

  constructor(
    protected userService: UserService,
    protected router: Router ) {
    super(userService, router);
  }

  ngOnInit() {



  }

}
