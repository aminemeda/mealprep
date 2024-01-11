import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Initialization logic if needed
  }

  async register() {
    console.log('Entering register method');
    if (this.registerForm.valid) {
      const userCredentials = this.registerForm.value;
      this.authService.register(userCredentials).subscribe(
        (response) => {
          console.log('Registration success:', response);
          window.location.href = '/login';
          // Handle success, e.g., navigate to login page
        },
        (error) => {
          console.error('Registration error:', error);
          this.presentToast('Registration failed. Please try again.');
        }
      );
    }
  }

  consoleLog() {
    console.log('Button clicked');
    this.register();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
