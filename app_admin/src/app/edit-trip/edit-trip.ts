import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  readonly tripForm;
  tripCode = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripData: TripData
  ) {
    this.tripForm = this.formBuilder.nonNullable.group({
      code: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') ?? '';
    if (!this.tripCode) {
      this.errorMessage = 'No trip code was provided.';
      return;
    }

    this.tripData.getTrip(this.tripCode).subscribe({
      next: (trip) => this.tripForm.patchValue({ ...trip, start: this.toDateInputValue(trip.start) }),
      error: (error) => this.errorMessage = error.error?.message ?? 'Unable to load trip.'
    });
  }

  saveTrip(): void {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.tripForm.getRawValue(), code: this.tripCode } as Trip;
    this.tripData.updateTrip(this.tripCode, formData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => this.errorMessage = error.error?.message ?? 'Unable to update trip.'
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  private toDateInputValue(value: string): string {
    return value ? new Date(value).toISOString().slice(0, 10) : '';
  }
}
