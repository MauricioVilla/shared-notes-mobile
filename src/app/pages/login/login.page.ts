import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/auth';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  error: string;
  returnUrl: any;
  loginForm: FormGroup;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  public logIn() {
    const loginFormValues = {
      username: this.username.value,
      password: this.password.value
    };
    this.authService.login(loginFormValues)
        .pipe(finalize(() => {
          this.loginForm.markAsPristine();
        }))
        .subscribe(() => {
          console.log(`User successfully logged`);
          this.consultUserLogged(this.username.value);
          this.router.navigate(['tabs/boards']);
        }, error => {
          console.log(`Login error: ${error.message}`);
          this.error = error;
        });
  }

  consultUserLogged(username: string) {
    this.authService.getUser(username)
        .subscribe(
            data => {
              localStorage.setItem('username', data.username);
              localStorage.setItem('userId', data.id);
              location.reload(true);
            }
        );
  }

}
