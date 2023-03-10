import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routingmodule';
import { ArchiveComponent } from './archive/archive.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import pl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

registerLocaleData(pl);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatNativeDateModule,
    MatDateFnsModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  declarations: [
    AppComponent,
    ArchiveComponent,
    TasksComponent,
    NotFoundComponent,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
