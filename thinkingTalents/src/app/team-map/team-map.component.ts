import { Component, OnInit } from '@angular/core';
import skills from './skillsData';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.css']
})
export class TeamMapComponent implements OnInit {

  skillsList: Array<skill> = skills;
  mapSkills: Array<mapSkill> = skills;

  team: team;
  currentPlayer: player;
  mode: string;

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
    this.mode = "create";
  }

  addTeamMember() {

    if(!this.currentPlayer.name){
      alert("Name cannot be null");
      return;
    }

    this.team.players.push(this.currentPlayer);
    this.reset();
  }

  updateSkills(skill: skill) {

    debugger;

    let index: number = this.currentPlayer.talents.indexOf(skill);

    if (index !== -1) {
      this.currentPlayer.talents.splice(index, 1);
    } else {
      this.currentPlayer.talents.push(skill);
    }
  }

  updateMember(player: player){

    let index: number = this.team.players.indexOf(player);

    this.team.players[index] = player;
    this.reset();
    
  }

  removeMember(player:player){

    let index: number = this.team.players.indexOf(player);
    
    if(index !== -1){
      this.team.players.splice(index, 1);
    };

    this.reset();

  }

  editPlayer(player: player) {

    this.reset();

    this.currentPlayer = player;
    this.mode = "edit";
    let i;

    if (player.talents.length > 0) {
      player.talents.forEach((x) => {
        i = this.skillsList.indexOf(x);
        this.skillsList[i].checked = true;
      });
    }

  }

  reset() {
    this.skillsList.forEach((skill) => {
      skill.checked = false;
    })

    this.currentPlayer = {
      talents: []
    }

    this.mode = "create";
  }

  buildTeamMap() {

    let index;

    this.team.players.forEach((player) => {

      if (player.talents && player.talents.length > 0) {

        player.talents.forEach((talent) => {

          index = this.mapSkills.indexOf(talent);
          this.mapSkills[index].checked = true;


          if (!this.mapSkills[index].names) this.mapSkills[index].names = [];

          this.mapSkills[index].names.push(player.name);

        });

      }

    });

    this.mode = "displayTeamMap"

  }

  isChecked(skillName: string){

   var index = this.mapSkills.map(function(e) { return e.name; }).indexOf(skillName);

   if(index >= 0) return this.mapSkills[index].checked;

   console.log(skillName + " not found in skills array");

   return false;
   
  }

  getNames(skillName: string){

    var index = this.mapSkills.map(function(e) { return e.name; }).indexOf(skillName);

    return this.mapSkills[index].names;

  }

  editTeamMap(){
    this.mode = "create";
  }

}
interface skill {
  name: string;
  description: string;
  checked?: boolean;
}

interface mapSkill {
  name: string;
  description?: string;
  checked?: boolean;
  names?: Array<string>;
}

interface player {
  name?: string;
  talents?: Array<skill>;
}

interface team {
  players: Array<player>;
}
