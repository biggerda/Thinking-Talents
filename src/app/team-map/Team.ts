import {Player} from "./Player";

export interface Team {
  players: Player[];
  stuffed?: boolean;
  team_name?: string;
  teampreferences?: string[];
  teamblindspots?: string[];
}
