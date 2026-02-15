import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, HeaderComponent],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.css'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
  ];

  countries = ['Canada', 'United States'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          // regex: letters and spaces only
          Validators.pattern(/^[A-Za-z ]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          // 10 digits
          Validators.pattern(/^[0-9]{10}$/),
        ],
      ],
      dob: ['', [Validators.required]],
      streetAddress: [
        '',
        [
          Validators.required,
          // letters, numbers, spaces
          Validators.pattern(/^[A-Za-z0-9 ]+$/),
        ],
      ],
      province: ['', [Validators.required]],
      country: ['', [Validators.required, this.mustBeCanadaValidator]],
      acceptTerms: [false, [Validators.requiredTrue]],
    });
  }

  // Custom validator: country must be Canada
  mustBeCanadaValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return value === 'Canada' ? null : { mustBeCanada: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // you could log or store the data here if needed
      this.router.navigate(['/products']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // helper for template
  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
  }
}