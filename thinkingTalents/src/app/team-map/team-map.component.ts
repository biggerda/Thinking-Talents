import { Component, OnInit } from '@angular/core';
import skills from './skillsData';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.css']
})
export class TeamMapComponent implements OnInit {

  skillsList: Array<skill> = skills;

  constructor() {
    console.log(this.skillsList);
   }

  ngOnInit() {
  }

}

interface skill {
  name: string;
  description: string;
}

