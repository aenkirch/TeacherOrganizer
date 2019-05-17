import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SchedulerTableComponent } from './scheduler-table/scheduler-table.component';
import { FormNbHComponent } from './form-nb-h/form-nb-h.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerTableComponent,
    FormNbHComponent,
    NavbarComponent
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
    NgbModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
