import { Component, Inject } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testAngular';

  selectedFormation: any;
  selectedGroupe: any;
  formations: any;
  groupes: any;
  selectedNbH : any;
  reloadNbH: any;

  constructor(@Inject(AppService) public appService: AppService) {}

  ngOnInit(){
    this.reloadNbH = false;
    this.getFormations(); 
  }

  getFormations(): void{
    this.appService.getAll('api/getFormations')
      .subscribe(
        formations => {
          this.formations = formations;
        }
      )
  }

  getGroupes(selectedFormation): void{
    this.selectedFormation = {id: selectedFormation.target.selectedOptions[0].id}
    this.appService.getGroupes('api/getGroupe', selectedFormation.target.selectedOptions[0].id)
      .subscribe(
        groupes => {
          this.groupes = groupes;
        }
      )
  }

  showTable(selectedGroupe): void{
    this.selectedGroupe = { id: selectedGroupe.target.selectedOptions[0].id };
  }

  editCell($event) {
    this.selectedNbH = $event;
  }

  //  when this function is triggered, it modifies temporarly this.reloadNbH in order to emits the order to SchedulerTableComponent to reload the NbHs

  receiveMessage($event) {
    this.reloadNbH = !this.reloadNbH;
    setTimeout(() => this.reloadNbH = !this.reloadNbH, 100);
    
    if (this.selectedNbH)
      this.selectedNbH = null;
  }
}