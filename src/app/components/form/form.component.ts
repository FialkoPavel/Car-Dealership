import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public hobbies: string[] = ['Codding', 'Running', 'Traveling', 'Dancing', 'Sports', 'Reading', 'Astronomy'];
  public seats: number[] = [2, 3, 4, 5, 6, 7];
  private numberOfVisitors: number = 0;


  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      hobbies: new FormControl('', [Validators.required]),
      favoriteColor: new FormControl('#FFFFFF', [Validators.required]),
      requiredSeats: new FormControl('', [Validators.required]),
      motorType: new FormControl('', [Validators.required])
    });

    this.numberOfVisitors = localStorage.getItem('numberOfVisitors') ?
       Number(localStorage.getItem('numberOfVisitors')): 0;

    this.numberOfVisitors++;

    localStorage.setItem('numberOfVisitors', JSON.stringify(this.numberOfVisitors));
  }

  submitForm() {
    if (this.form.valid) {
      const key = "key_" + new Date().getTime()
      localStorage.setItem(key, JSON.stringify(this.form.value));
    } else {
      console.log("Form is invalid", this.form.value);
    }
  }

}
