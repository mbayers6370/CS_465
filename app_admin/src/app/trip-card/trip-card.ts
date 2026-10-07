import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  imports: [],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input({ required: true }) trip!: Trip;

  constructor(private router: Router) {}

  editTrip(): void {
    this.router.navigate(['/edit-trip', this.trip.code]);
  }
}
