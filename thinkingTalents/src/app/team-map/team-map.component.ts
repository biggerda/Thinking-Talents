import { Component, OnInit } from '@angular/core';
import skills from './skillsData';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.css']
})
export class TeamMapComponent implements OnInit {

  skillsList: Array<skill> = skills;
  team: team;
  currentPlayer: player;

  constructor() {
    console.log(this.skillsList);

    this.team = {
      players: []
    };

    this.currentPlayer = {
      talents: []
    }

  }

  ngOnInit() {
  }

  updateCurrentTeamMember(skill: skill) {

    let index: number = this.currentPlayer.talents.indexOf(skill);

    if (index !== -1) {
      this.currentPlayer.talents.splice(index, 1)
    } else {
      this.currentPlayer.talents.push(skill);
    }
  }

  addTeamMember() {

    this.team.players.push(this.currentPlayer);
    this.reset();

  }

  reset() {
    this.skillsList.forEach((skill) => {
      skill.checked = false;
    })

    this.currentPlayer = {};
  }

}

interface skill {
  name: string;
  description: string;
  checked?: boolean;
}

interface player {
  name?: string;
  talents?: Array<skill>;
}

interface team {
  players: Array<player>;
}
