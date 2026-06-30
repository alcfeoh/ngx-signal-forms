import { firstValueFrom } from "rxjs";
import { inject, Service } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {UserInfo} from './user.type';

@Service()
export class UserService {

  private http = inject(HttpClient);

  saveUserInfo(userInfo: UserInfo): Promise<unknown> {
    return Promise.resolve(true);
    // return firstValueFrom(this.http.post("/api/users", userInfo));
  }
}
