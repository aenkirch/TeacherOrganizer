import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

/*
  *
  * We use this component to display and manage the data of the Scheduler table.
  * 
*/

@Component({
  selector: 'scheduler-table',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.css']
})
export class SchedulerTableComponent implements OnInit {

  @Output() editEvent = new EventEmitter<any>();
  @Input() selectedFormation: any;
  @Input() selectedGroupe: any;
  @Input() reloadNbH: any;
  periodes: any;
  formationModules: any;
  formationMatieres: any;
  tabNbH: any;
  tabTotaux: any;
  draggedMatiere: any;
  draggedPeriode: any;

  constructor(@Inject(AppService) public appService: AppService,  private toastr: ToastrService) { }

  showError(reason) {
    this.toastr.error(reason, 'Not a valid Drag and Drop', 
    { timeOut: 5000 });
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.reloadNbH){
      console.log("ok")
      this.getMatieres();
    }
    if (this.selectedGroupe && this.selectedFormation){
      this.getPeriodes();
      this.getModules();
      this.getMatieres();
    }
  }

  getPeriodes(): void {
    this.appService.getPeriodes('api/getPeriodes', this.selectedFormation.id)
      .subscribe(
        periodes => {
          this.periodes = periodes;
        }
      )
  }

  getModules(): void {
    this.appService.getModules('api/getModules', this.selectedFormation.id)
      .subscribe(
        formationModules => {
          this.formationModules = formationModules;
        }
      )
  }

  getMatieres(): void {
    this.tabNbH = [];
    this.tabTotaux = [];
    
    this.appService.getMatieres('api/getAllMatieres', this.selectedFormation.id)
      .subscribe(
        formationMatieres => {
          this.formationMatieres = formationMatieres;
          this.getNbH(formationMatieres);
        }
      )
  }

  getNbH(matieres): void {
    matieres.forEach((matiere) => {
      this.appService.getNbH('api/getNbH', matiere.value)
      .subscribe(
        retour => {
          retour.forEach((item) => {
            if (!this.tabNbH[matiere.value])
              this.tabNbH[matiere.value] = [];
            if (!this.tabTotaux[item.id_period])
              this.tabTotaux[item.id_period] = 0;
            if (!this.tabNbH[item.id_mat][item.id_period])
              this.tabTotaux[item.id_period] += item.nbH;
            this.tabNbH[item.id_mat][item.id_period] = item.nbH;
          })
        }
      )
    })
  }

  dragEnd(newIdMatiere, newIdPeriode) {
    
    console.log(this.draggedMatiere);
    console.log(this.draggedPeriode);
    console.log(newIdMatiere);
    console.log(newIdPeriode);
    
    //  If swapped cells are the same
    if (this.tabNbH[newIdMatiere] && this.tabNbH[newIdMatiere][newIdPeriode] == this.tabNbH[this.draggedMatiere][this.draggedPeriode])
      return this.showError("Cells values are already the same, no need to swap :)");

    //  Swapping two table cells
    if (this.tabNbH[newIdMatiere] && this.tabNbH[newIdMatiere][newIdPeriode]){
      this.appService.modifyNbHbyNbH('api/modifyNbHByNbH', newIdMatiere, newIdPeriode, this.tabNbH[this.draggedMatiere][this.draggedPeriode])
      .subscribe(
        result => this.appService.modifyNbHbyNbH('api/modifyNbHByNbH', this.draggedMatiere, this.draggedPeriode, this.tabNbH[newIdMatiere][newIdPeriode])
        .subscribe(result => this.getMatieres())
      );
    }

    //  Simple DnD
    else {
      this.appService.modifyNbH('api/modifyNbH', newIdMatiere, newIdPeriode, this.draggedMatiere, this.draggedPeriode)
      .subscribe(result => this.getMatieres());
    }
  }

  isEditing(idMatiere, idPeriode) {
    if (this.tabNbH[idMatiere] && this.tabNbH[idMatiere][idPeriode])
      this.editEvent.emit([ idMatiere, idPeriode, this.tabNbH[idMatiere][idPeriode] ]);
    else
      this.editEvent.emit([ idMatiere, idPeriode ]);
  }
}