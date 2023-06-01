import { defineStore } from "pinia";
import Recommandation from "~/models/recommandation.model";
import Team from "~/models/team.model";
import recommandationService from "~/common/recommandation.service";

export interface FiltersState {
  recommandations: Array<Recommandation>;
  eligibleRecommandations: Array<FinalResult>;
  otherRecommandations: Array<FinalResult>;
}

export interface Result {
  epreuve: string;
  teams?: Array<RecommandationTeam>;
  minimalCondition: { reason: string; valid: boolean; },
  remainingPoint: number,
  championships: Array<String>
}

export interface FinalResult {
  team: RecommandationTeam;
  epreuves: Array<string>;
  minimalCondition: { reason: string; valid: boolean; },
  remainingPoint: number,
  championships: Array<String>
}

export interface RecommandationTeam {
  id?: number;
  name: string;
  description: string;
  motivation: string;
  departement: string;
  members?: Array<TeamMember>;
  sessions: Array<string>;
}

export interface TeamMember {
  firstName: string;
  lastName: string;
  ffe: string;
}

export const useRecommandationsStore = defineStore("recommandations", {
  state: (): FiltersState => ({
    recommandations: [],
    eligibleRecommandations: [],
    otherRecommandations: []
  }),
  getters: {
    allRecommandations: (state) => state.recommandations,
    allEligibleRecommandations: (state) => state.eligibleRecommandations,
    allOtherRecommandations: (state) => state.otherRecommandations,
  },
  actions: {
    async fetchAllRecommandations(): Promise<void> {
      await recommandationService.getAllRecommandations().then((recommandations) => {
        console.log(recommandations);
        this.recommandations = recommandations;
      });
    },
    async fetchRecommandationsEligible(): Promise<void> {
      const firstResult : Result[] = [];
      const finalResult : FinalResult[] = []; 
      
      await recommandationService.getAllRecommandations().then((myRecommandation) => {
        myRecommandation.map((recommandation, index) => {
          recommandation.disciplines?.map((myDiscipline) => {
            myDiscipline.epreuves?.map((myEpreuve) =>{
              if (myEpreuve.remainingPoint==0) {
                const resultLigne: Result = {
                  epreuve: myEpreuve.epreuve,
                  teams: recommandation.teams,
                  minimalCondition: myEpreuve.minimalCondition,
                  remainingPoint: 0,
                  championships: myEpreuve.championships
                }
                firstResult.push(resultLigne);
              }
            });
          });
        });
      });
      
      firstResult.forEach((item) => {
        item.teams?.forEach((team) => {
          const exist = finalResult.find((result) => result.team === team);
          let epreuvesVal =null;
          if (exist) {
             exist.epreuves.push(item.epreuve);
             epreuvesVal = exist.epreuves;
          }else{
            epreuvesVal = new Array(item.epreuve);
          }
          const finalResultLigne : FinalResult = {
            team: team, 
            epreuves: epreuvesVal,
            minimalCondition: item.minimalCondition,
            remainingPoint: item.remainingPoint,
            championships: item.championships
          }
          finalResult.push(finalResultLigne);
        });
      });
      
      this.eligibleRecommandations = finalResult;
      
    },
    
    async fetchRecommandationsOther(): Promise<void> {
      const firstResult : Result[] = [];
      const finalResult : FinalResult[] = []; 
      let somme =0;
      
      await recommandationService.getAllRecommandations().then((myRecommandation) => {
        myRecommandation.map((recommandation, index) => {
          recommandation.disciplines?.map((myDiscipline) => {
            myDiscipline.epreuves?.map((myEpreuve) =>{
              if (myEpreuve.remainingPoint>0) {
                somme+=myEpreuve.remainingPoint;
                const resultLigne: Result = {
                  epreuve: myEpreuve.epreuve,
                  teams: recommandation.teams,
                  minimalCondition: myEpreuve.minimalCondition,
                  remainingPoint: myEpreuve.remainingPoint,
                  championships: myEpreuve.championships
                }
                firstResult.push(resultLigne);
              }
            });
          });
        });
      });
      
      firstResult.forEach((item) => {
        item.teams?.forEach((team) => {
          const exist = finalResult.find((result) => result.team === team);
          let epreuvesVal =null;
          if (exist) {
             exist.epreuves.push(item.epreuve);
             epreuvesVal = exist.epreuves;
          }else{
            epreuvesVal = new Array(item.epreuve);
          }
          const finalResultLigne : FinalResult = {
            team: team, 
            epreuves: epreuvesVal,
            minimalCondition: item.minimalCondition,
            remainingPoint: item.remainingPoint,
            championships: item.championships
          }
          finalResult.push(finalResultLigne);
        });
      });
      
      this.otherRecommandations = finalResult;
      
    },
    
  },
});
