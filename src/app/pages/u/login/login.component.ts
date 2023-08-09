import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';


  constructor(private authService: AuthenticationService) {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(token => {
      console.log(token);
    })
  }
}
