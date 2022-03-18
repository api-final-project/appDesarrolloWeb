import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class NodeService {

  private tokeninfo = new BehaviorSubject("");
  tokeninfo$ = this.tokeninfo.asObservable();

  loadToken(token: string) {

    this.tokeninfo.next(token);

  }

}