import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  cleanAll(): void {
    localStorage.clear();
  }

  registerSession(userID): void {
    localStorage.setItem('userID', userID);
  }
  loadSession(): string {
    return localStorage.getItem('userID');
  }
  deleteSession(): void {
    localStorage.removeItem('userID');
  }

  registerConversation(cid): void {
    localStorage.setItem('cid', cid);
  }

  loadConversation(): string {
    return localStorage.getItem('cid');
  }

  deleteConversation(): void {
    localStorage.removeItem('cid');
  }



  constructor() {}

}
