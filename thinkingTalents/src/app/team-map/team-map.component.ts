import { Component, OnInit } from '@angular/core';
import skills from './skillsData';
import jsPDF from 'jsPDF'
import jquery from 'jquery'
import * as html2canvas from "html2canvas"

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
  doc: any;

  constructor() {

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

    this.mode = "displayTeamMap";

  }

  styleNames() {

    var names = jquery(".name");

    if (names && names.length > 0)

      names.forEach((div) => {

        if (div.height > 175) {
          alert("damn!");
        }

      });

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

    this.mapSkills.forEach((skill) => {
      skill.checked = false;
      skill.names = [];
    })

    this.mode = "create";

  }

  print() {

    html2canvas(jquery("#teamMap")[0], {
      proxy: "http://localhost:4200",
      logging: true,
    }).then((canvas) => {

      var img = canvas.toDataURL('image/png');
        //window.open(img);

        this.doc = new jsPDF('landscape', 'pt','legal');
        // //this.doc.text(10, 10, "hello!");
        this.doc.addImage(img, 'PNG', 0, 0, 1008, 612);

        this.doc.save('sample.pdf');
        //this.doc.output("dataurlnewwindow");

    });
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
