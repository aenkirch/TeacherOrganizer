import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

/*
  *
  * We use this component to display and manage the data of the form we use to manipulate the data in our scheduler table.
  * You can using this create a value in a cell, or modify it, or even delete it !
  * 
  * On a more technical point of view, we used Angular Material components in order to have a cool design for this panel we're displaying.
  * 
*/

@Component({
  selector: 'form-nb-h',
  templateUrl: './form-nb-h.component.html',
  styleUrls: ['./form-nb-h.component.css']
})
export class FormNbHComponent implements OnInit {

  @Input() selectedNbH : any;
  @Output() messageEvent = new EventEmitter<any>();

  constructor(sanitizer: DomSanitizer, @Inject(AppService) public appService: AppService, private toastr: ToastrService) {}

  ngOnInit() {
  }

  showSuccess(message) {
    this.toastr.success(message, 'Success !',
    {timeOut: 5000});
  }

  createNbH(newNbH) {
    this.appService.createNbHvalue('api/createNbHvalue', newNbH, this.selectedNbH[0], this.selectedNbH[1])
    .subscribe(
      retour => {
        this.showSuccess("Successfully created NbH with value " + newNbH);
        this.sendMessage();
      }
    )
  }

  editNbH(newNbH) {
    this.appService.editNbHvalue('api/editNbHvalue', newNbH, this.selectedNbH[0], this.selectedNbH[1])
    .subscribe(
      retour => {
        this.showSuccess("Successfully edited NbH with value " + newNbH);
        this.sendMessage();
      }
    )
  }

  deleteNbH() {
    this.appService.deleteNbHvalue('api/deleteNbHvalue', this.selectedNbH[0], this.selectedNbH[1])
    .subscribe(
      retour => {
        this.showSuccess("Successfully deleted NbH");
        this.sendMessage();
      }
    )
  }

  //  this closes the edit panel and emits the order to refresh the NbH all around the table

  sendMessage() {
    this.messageEvent.emit();
  }

}
