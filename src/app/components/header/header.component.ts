import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local/local.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // ha la sola funzionalit di logout
  // questa funzionalità richiede l'utilizzo di UserService, AuthService e localStorageService
  // come scritto anche in order.component non trovo eccezionale dover usare tre servizi in un
  // solo metodo, quindi potrebbe essere una buona idea accorpare queste funzionalità - cfr

  constructor(private localStorageService: LocalStorageService,
    private usersService: UserService,
    private router: Router,
    private authService: AuthGuardService
    ) { }


  logout() {
    this.usersService.logout().subscribe(() => {
      // pulisco localStorage
      this.localStorageService.deleteSession();
      this.localStorageService.deleteConversation();
      this.localStorageService.cleanAll();

      // notifico ad authservice che è avvenuto il log out
      this.authService.setLoggedUser(null);
      this.authService.setSessionID(null);
      this.authService.setUserLogged(false);
      // redirect
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
