import {Component, OnInit} from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import {AuthenticationService} from '../../core/auth';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'boards.page.html',
  styleUrls: ['boards.page.scss']
})
export class BoardsPage implements OnInit  {

  boards: [{}];
  userId: any;
  username: any;
  approved: string;
  authenticated: boolean;

  constructor(private services: BoardsService,
              private authService: AuthenticationService) {
      this.authService.isAuthorized()
          .pipe(finalize(() => {
          }))
          .subscribe(data => {this.authenticated = data; });
      this.authService.getUsernameStorage()
          .subscribe(
              data => {
                  this.username = data;
              }
          );
      this.authService.getUserIdStorage()
          .subscribe(
              data => {
                  this.userId = data;
              }
          );
      this.getBoards();
  }

    ngOnInit() {
        // location.reload(true);
    }

  /*
   Get boards from the user
   */
  getBoards() {
    this.services.getBoardsByUser(this.username)
        .subscribe(
            data => {
              this.boards = data;
            },
            error => {
            }
        );
  }

}
