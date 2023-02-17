import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public hobbies: string[] = [
    'Codding',
    'Running',
    'Traveling',
    'Dancing',
    'Sports',
    'Reading',
    'Astronomy',
  ];
  public seats: number[] = [2, 3, 4, 5, 6, 7];
  private numberOfVisitors: number = 0;
  public selectedColor = '#ffffff';
  public btnLabel: string = 'Submit';
  public tooltipContent: string =
    'Please complete all form fields before submitting.';

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

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
      motorType: new FormControl('', [Validators.required]),
    });

    this.numberOfVisitors = localStorage.getItem('numberOfVisitors')
      ? Number(localStorage.getItem('numberOfVisitors'))
      : 0;

    this.numberOfVisitors++;

    localStorage.setItem(
      'numberOfVisitors',
      JSON.stringify(this.numberOfVisitors)
    );
  }

  submitForm() {
    if (this.form.valid) {
      const key = 'key_' + new Date().getTime();
      this.localStorageService.saveData(key, this.form.value);
      this.form.reset();
      this.dialog.open(NotificationDialogComponent);
      this.form.controls['favoriteColor'].patchValue('#FFFFFF');
    } else {
      console.log('Form is invalid', this.form.value);
    }
  }
}
