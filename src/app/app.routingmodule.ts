import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArchiveComponent } from './archive/archive.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
