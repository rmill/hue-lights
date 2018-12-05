import { Component } from '@angular/core';

import { GameService } from '../shared/service/game.service';
import { PushNotificationService } from '../shared/service/push-notification.service';
import { ViewService } from '../shared/service/view.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  readonly MAX_USER_NAME_LENGTH: number = 16;

  private loggingIn: boolean = false;
  private errorMsg: string;
  private selectedGameId: string;
  private userName: string;

  constructor(
    private game: GameService, private pushNotification: PushNotificationService, private view: ViewService
  ) {}

  ngOnInit() {
    this.game.findGames().then(games => this.selectGame(games))
  }

  login() {
    if (this.validate()) {
      this.loggingIn = true;

      this.pushNotification.getToken()
        .catch(() => null)
        .then(token => this.game.login(this.userName, this.selectedGameId, token))
        .then(() => this.view.showController())
    }
  }

  selectGame(games) {
    if (games) {
      this.selectedGameId = Object.keys(games)[0];
      this.game.mountGame(this.selectedGameId)
    } else {
      this.view.showNoGames()
    }
  }

  private validate() {
    this.errorMsg = '';

    if (!this.userName) {
      this.errorMsg = 'Name cannot be empty';
      return false;
    }

    if (this.userName.length > this.MAX_USER_NAME_LENGTH) {
      this.errorMsg = `Name must be ${this.MAX_USER_NAME_LENGTH} characters or less`;
      return false;
    }

    return true;
  }
}
