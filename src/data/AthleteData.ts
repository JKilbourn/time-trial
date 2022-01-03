import {Athlete} from '../domain/Athlete';

import athleteArray from './AthleteData.json';
class AthleteData {
     timeTrailAthleteArray: Athlete[] = this.getAthleteData();

     private getAthleteData () : Athlete [] {
          let aArray: Athlete[] = []; 
          for(let i = 0; i < athleteArray.Athlete.length; i++) {
               aArray.push (Object.assign(new Athlete(), athleteArray.Athlete[i]));
          }
          return aArray;
         
     }

     
}

export {AthleteData};