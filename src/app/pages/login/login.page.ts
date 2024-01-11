import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // This is where you can perform initialization logic when the component is created.
  }

  async login() {
    console.log('Entering login method');
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Request Payload:', credentials); // Log the request payload
      this.authService.login(credentials).subscribe(
        (response) => {
          console.log('Login success:', response);
          const token = this.authService.extractToken(response);
          ;
          if (token) {
            localStorage.setItem('auth_token', token);
            // Other logic
          } else {
            console.error('Token is null or undefined');
          }
        
          console.log('Authentication Token:', token);
          
          window.location.href = '/home';


          // Handle success, e.g., store token and navigate to another page
        },
        (error) => {
          console.error('Login error:', error);
          console.log('Error details:', error.error); // Log additional error details
          if (error.status === 422) {
            console.log('Validation Errors:', error.error.errors); // Log validation errors if available
          }
          this.presentToast('Login failed. Please check your credentials.');
        }
      );
    }
  }
  


  consoleLog() {
    console.log('Button clicked');
    this.login();
  }
  async presentToast(onmessage: string) {
    const toast = await this.toastController.create({
      message: onmessage,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
