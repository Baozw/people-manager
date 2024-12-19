import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  personForm: FormGroup;
  personId = 0;
  avatar = '';
  isLoading = true;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize form with validation
    this.personForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.personId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPerson();
  }

  loadPerson() {
    this.peopleService.getPerson(this.personId).subscribe({
      next: (response) => {
        this.personForm.patchValue(response);
        this.avatar = response.avatar;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching person:', error);
        this.isLoading = false;
      }
    });
  }

  save() {
    if (this.personForm.valid) {
      const data = this.personForm.getRawValue();
      this.peopleService.updatePerson(this.personId, data).subscribe({
        next: () => {
          alert('Person updated successfully!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating person:', error);
        }
    });
    } else {
      // Mark all controls as touched to trigger validation messages
      this.personForm.markAllAsTouched();
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
