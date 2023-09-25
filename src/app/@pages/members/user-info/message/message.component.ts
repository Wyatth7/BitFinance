import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/shared/services/messaging/email.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() email!: string;
  submitInProgress = false;

  emailForm = new FormGroup({
    subject: new FormControl(''),
    text: new FormControl('')
  })

  constructor(private emailService: EmailService) {}

  async executeAction() { 
    this.submitInProgress = true;

    const subject = this.emailForm.get('subject')?.value;
    const text = this.emailForm.get('text')?.value;

    if (!subject || !text) return;

    await this.emailService.sendCustomEmail(this.email, subject, text)
    this.clearForm();

    this.submitInProgress = false;
  }

  clearForm() {
    this.emailForm.reset();
  }
}
