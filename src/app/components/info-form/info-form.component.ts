import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit {

  constructor(
    protected userService: UserService,
    protected router: Router ) {

  }

  protected user: User = new User;

  saveInfo(): void {
    console.log('salvataggio conversazione');
    this.userService.updateConversation('');
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      (resp) => {
        if (!isNullOrUndefined(resp)) {
          this.user = resp.body;
        }
      });
  }

}
