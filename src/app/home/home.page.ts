import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any; // Variable to store user information

  constructor(private authService: AuthService) {}

  ionViewDidEnter() {
    // Fetch user details when the view enters
    this.authService.getUserDetails().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user details in Home Page:', error);
      }
   
    );
  }

}
