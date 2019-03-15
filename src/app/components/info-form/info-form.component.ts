import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { isNullOrUndefined } from 'util';
import { LocalStorageService } from '../../services/local/local.storage.service';

@Component({
  selector: 'app-info-form',
  template: '',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit {

  constructor(
    protected userService: UserService,
    protected localStorageService: LocalStorageService,
    protected router: Router ) {

  }
  saveInfo(): void {
    /* ogni volta che si cambia pagina fra quelle di inserimento info
       salvo tutto lo user sul bean di conversazione del server
    */
    console.log('salvataggio conversazione');
    const body = JSON.stringify({

      firstname: this.userService.user.firstname,
      secondname: this.userService.user.secondname,
      age: this.userService.user.age,
      country: this.userService.user.country,
      city: this.userService.user.city,
      address: this.userService.user.address,
      mainHobby: this.userService.user.mainHobby,
      job: this.userService.user.job,
      favTvShow: this.userService.user.favTvShow

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
    /* quando si esce dalle pagine di inserimento info salvo l'utente
      sulla conversazione remota come in saveInfo();
      dopo però richiamo endConversation(), che termina la conversazione
      ponendo a null il cid e terminando il ciclo di vita del relativo bean
      Inoltre lo user conservato sul bean viene persistito sul DB
    */
    this.saveInfo();
    this.userService.endConversation().subscribe(
      (resp) => {
        if (! isNullOrUndefined(resp.body)) {
          this.localStorageService.deleteConversation();
          this.router.navigate(['/app-home']);
          console.log('conversazione chiusa');
        }
      }
    );
  }


  protected initUser() {
    /* inizializzo l'utente locale con quello remoto persistito sul server

    */
    if (! isNullOrUndefined(this.userService.user.id)) {
      return true;
    }
    this.userService.getUserInfo().subscribe( // richiede i dati completi dell'utente - eseguito sempre
    (resp) => {
      if (! isNullOrUndefined(resp.body)) {
        this.userService.user = resp.body;
        }
      }
    );
  }

  ngOnInit() { // controlla conversazione e inizializza user da server
    let cid = this.userService.getCid();
    if (isNullOrUndefined(cid)) {
      // caso in cui o si deve aprire una conversazione nuova
      // o si è fatto refresh e si deve ripristinare una vecchia
      if (isNullOrUndefined(this.localStorageService.loadConversation())) {
        // in questo caso siamo sicuri che non c'è nessuna conversazione da ripristinare => se ne apre una nuova
        this.userService.startInformationConversation().subscribe(
          (resp) => {
            cid = (Number)(resp.body); // avrei potuto specificare il tipo di response
            if (! isNullOrUndefined(cid)) {
              this.userService.setCid((Number)(cid));
              this.localStorageService.registerConversation(cid);
              this.initUser();
              console.log('new conversation established, with cid: ' + cid);
            }
          });
      } else {
        // c'è una conversazione da ripristinare,
        // si verifica che sia ancora in vita sul server ed in tal caso si ripristina
        cid = (Number)(this.localStorageService.loadConversation());
        this.userService.setCid((Number)(cid));
        this.userService.convCheck().subscribe(
          (resp) => {
            if (resp.body !== true) { // conversazione scaduta sul server, quindi si cancella anche sul client e se ne apre una nuova
              this.localStorageService.deleteConversation();
              this.userService.setCid(null);
              console.log('conversation time-out');
              this.router.navigate(['/app-home']);
            } else {
              console.log('restored conversation, with cid: ' + cid);
              this.initUser();
            }
          }
        );
        }
    } else {
      this.initUser();
    }
  }
}
