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

  ngOnInit(){}
}