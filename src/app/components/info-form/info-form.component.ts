import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-info-form',
  template: '',
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
    const body = JSON.stringify({
      firstname: this.user.firstname,
      secondname: this.user.secondname,
      age: this.user.age,

      country: this.user.country,
      city: this.user.city,
      address: this.user.address,

      mainHobby: this.user.mainHobby,
      job: this.user.job,
      favTvShow: this.user.favTvShow

    });
    this.userService.updateConversation(body).subscribe(
      (resp) => {
        if (!isNullOrUndefined(resp)) {
          console.log('utente aggiornato');
        }
      }
    );
  }

  closeInfoAndSave() {
    this.saveInfo();
    this.userService.endConversation().subscribe(
      (resp) => {
        if (! isNullOrUndefined(resp.body)) {
          this.router.navigate(['/app-home']);
          console.log('conversazione chiusa');
        }
      }
    );
  }

  ngOnInit() {
    if (isNullOrUndefined(this.userService.getCid())) { // inizia la conversazione, nel caso non fosse già in corso (refresh)
      this.userService.startInformationConversation().subscribe(
        (resp) => {
          if (! isNullOrUndefined(resp.body)) {
            this.userService.setCid((Number)(resp.body));
            console.log('new cid: ' + resp.body);
          }
        });
    }
    this.userService.getUserInfo().subscribe( // richiede i dati completi dell'utente
    (resp) => {
      if (! isNullOrUndefined(resp.body)) {
        this.user = resp.body;
        }
      }
    );
  }
}
