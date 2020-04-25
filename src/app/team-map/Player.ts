import {Skill} from "./Skill";

export interface Player {
  name?: string;
  talents?: Skill[];
  a_talents?: number;
  p_talents?: number;
  r_talents?: number;
  i_talents?: number;
  talentPref?: string;
  blindspot?: string;
  wb?: boolean;
}
