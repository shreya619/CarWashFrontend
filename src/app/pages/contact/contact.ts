import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  locations = [
    {
      name: 'Baner Location',
      address: 'Laxman Nagar,Baner',
      phone: '+91 9763613438',
      email: 'baner@carwashpro.com',
      hours: 'Mon-Sat: 8AM-8PM, Sun: 10AM-6PM',
      image: 'assets/locations/downtown.jpg'
    },
    {
      name: 'Aundh Location',
      address: 'Opposite to Westend Mall,Aundh,Punr',
      phone: '+91 5678904321',
      email: 'westside@carwashpro.com',
      hours: 'Mon-Sat: 7AM-9PM, Sun: 9AM-7PM',
      image: 'assets/locations/westside.jpg'
    },
    {
      name: 'Westport Location',
      address: 'Beside WestPort Building Baner',
      phone: '+91 123456789',
      email: 'westport@carwashpro.com',
      hours: 'Mon-Sat: 8AM-8PM, Sun: 10AM-6PM',
      image: 'assets/locations/eastport.jpg'
    }
  ];

  contactMethods = [
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '+91 (555) 123-WASH',
      action: 'tel:+91 5551234567'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      description: 'Send us your questions',
      value: 'info@carwashpro.com',
      action: 'mailto:info@carwashpro.com'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Start Chat',
      action: '#'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Find our locations',
      value: 'View Locations',
      action: '#locations'
    }
  ];

  faqs = [
    {
      question: 'What are your operating hours?',
      answer: 'Most of our locations are open Monday-Saturday 8AM-8PM and Sunday 10AM-6PM. Hours may vary by location.',
      isOpen: false
    },
    {
      question: 'Do you offer mobile car wash services?',
      answer: 'Yes! We offer mobile car wash services for your convenience. Contact us to schedule a mobile service appointment.',
      isOpen: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, cash, and digital payments including Apple Pay and Google Pay.',
      isOpen: false
    },
    {
      question: 'How long does a typical car wash take?',
      answer: 'Basic wash takes 15-20 minutes, while full detailing services can take 1-2 hours depending on the package selected.',
      isOpen: false
    },
    {
      question: 'Do you offer membership or loyalty programs?',
      answer: 'Yes! We offer various membership packages with discounts and exclusive benefits. Ask about our loyalty program.',
      isOpen: false
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.contactForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['pattern']) return 'Please enter a valid phone number';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}