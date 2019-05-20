import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SchedulerTableComponent } from './home/scheduler-table/scheduler-table.component';
import { FormNbHComponent } from './home/form-nb-h/form-nb-h.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { NavbarComponent } from './navbar/navbar.component';
import { EditingComponent } from './editing/editing.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editing',
    component: EditingComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SchedulerTableComponent,
    FormNbHComponent,
    NavbarComponent,
    EditingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragAndDropModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgbModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
