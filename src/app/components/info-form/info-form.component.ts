import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit {

  constructor(
    private authService: AuthGuardService,
    private userService: UserService,
    private router: Router ) {

  }

  user: User;

  saveInfo(): void {
    console.log('salvataggio conversazione');
    this.userService.updateConversation('');
  }

  ngOnInit() {
    this.user = this.userService.getUserInformation();
  }

}
