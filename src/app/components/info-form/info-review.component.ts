import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { isNullOrUndefined } from 'util';
import { LocalStorageService } from '../../services/local/local.storage.service';

@Component({
  selector: 'app-info-review',
  templateUrl: 'info-review.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoReviewComponent implements OnInit {

  constructor(
    protected userService: UserService,
    protected localStorageService: LocalStorageService,
    protected router: Router ) {

  }

  user: User = new User;

  ngOnInit() {
    console.log("daje oh");
    this.userService.getUser().subscribe(
      (resp) => {
        if (!isNullOrUndefined(resp.body)) {
          this.user = resp.body;
        } else {
          this.user = null;
        }
      });
  }


}
