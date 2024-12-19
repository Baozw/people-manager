import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './pages/people/people.component';
import { PersonComponent } from './pages/person/person.component';

const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'person/:id', component: PersonComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}