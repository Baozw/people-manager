import { Component, OnInit, ViewChild } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User, UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people: User[] = [];
  isLoading = true;
  totalPages: number = 0;
  totalUsers: number = 0;
  currentPage: number = 1;
  perPage: number = 6; // Default per_page from API

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private peopleService: PeopleService, private router: Router) {}

  ngOnInit(): void {
    this.loadPeople(this.currentPage);
  }

  loadPeople(page: number): void {
    this.isLoading = true;
    this.peopleService.getPeople(page).subscribe({
      next: (response: UserResponse) => {
        this.people = response.data;
        this.currentPage = response.page;
        this.perPage = response.per_page;
        this.totalUsers = response.total;
        this.totalPages = response.total_pages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching people:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadPeople(event.pageIndex + 1);
  }

  viewPerson(person: User): void {
    this.router.navigate(['/person', person.id]);
  }
}
