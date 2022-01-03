import React, { useEffect, ReactNode, useState } from 'react';
import './App.css';
import {Table, Button} from 'react-bootstrap';
import {StopWatch} from '../src/domain/StopWatch';
import {Athlete} from '../src/domain/Athlete';
import {AthleteData} from '../src/data/AthleteData';

</* set lap is not handling if the button is disabled or not.  Still creats a lap in backgroun
    don't allow Lap click before the stop watch is created 
    add react dnd */></>
function AthleteTableRows <ListItem> ({
}: {
}) {
  
  const [stopwatchMap, setStopWatch] = useState(new Map());
  const [athletes, setAthletes] = useState<Athlete[]>();

  const createStopWatch = (key: number, startTimeMS: number) => {
    if(stopwatchMap.get(key)) {
      let tempMap = new Map(stopwatchMap);
      let stopWatch = tempMap.get(key);
      stopWatch.setRunningTime(startTimeMS);
      stopWatch.setStopTimeMS(null);
      stopWatch.setIsActive(true);
      setStopWatch(new Map(tempMap));
    } else {
      let stopWatch = new StopWatch(true, startTimeMS);
      setStopWatch(new Map(stopwatchMap.set(key,stopWatch)));
    }
  }
  
  const stopStopWatch = (key: number, stopTimeMS: number) => {
    let tempMap = new Map(stopwatchMap);
    let stopWatch = tempMap.get(key);
    stopWatch.setIsActive(false);
    stopWatch.setStopTimeMS(stopTimeMS);
    stopWatch.setLap(stopTimeMS);
    stopWatch.setRunningTime(stopTimeMS);
    stopWatch.setLapsDisplay();    
    setStopWatch(new Map(tempMap));
    console.log(stopWatch);
  }

  const lapStopWatch = (key: number, lapTimeMS: number) => {
    let tempMap = new Map(stopwatchMap);
    let stopWatch = tempMap.get(key);
    stopWatch.setLap(lapTimeMS);
    setStopWatch(new Map(tempMap));    
  }

  const removeAthlete = (key: number) => {
    if(athletes) {
      let tempAthletes: Athlete[] = [];
      tempAthletes=athletes.slice();
      tempAthletes?.splice(key,1);
      setAthletes(tempAthletes);
    }
  } 

  /* start the timer */ 
  useEffect(() => {
    let intervalId: NodeJS.Timeout ; 
    let tempMap = new Map<number,StopWatch>(stopwatchMap); 
    intervalId = setInterval(() => {
      tempMap.forEach((stopwatch: StopWatch, key: number) => {
        if (stopwatch.isActive) {
          let time = Date.now();
          stopwatch.setRunningTime(time);
          stopwatch.setRunningLapTime(time);
          tempMap.set(key, stopwatch);
        }
      });
      setStopWatch(new Map(tempMap));
    }, 100)  
    return () => clearInterval(intervalId);               
  }, [stopwatchMap])
  
  /* fetch Data */
  useEffect(() => {
    let athletes = new AthleteData();
    setAthletes(athletes.timeTrailAthleteArray);
  }, []);


  return (
    <>  

     {!athletes ? "Loading" : 
     athletes?.map((item, index)=> (               
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.getFirstNameLastName()}</td>
            <td>{stopwatchMap.get(index) ? stopwatchMap.get(index).formatedRunningTime : "HH:MM:SS.MS"}</td>
            <td>{stopwatchMap.get(index) ? stopwatchMap.get(index).lapsDisplayString : '' } </td>
            <td>
              <Button variant="primary" key={index} disabled={stopwatchMap.get(index) ? stopwatchMap.get(index).isActive : false} 
                onClick={()=>(createStopWatch(index, Date.now()))}>
                  Start
              </Button> 
            </td>
            <td>
              <Button variant="danger" key={index}
                disabled={stopwatchMap.get(index) ? !stopwatchMap.get(index).isActive : true}
                onClick={()=> (stopStopWatch(index, Date.now()))}>
                  Stop
              </Button>
            </td>
            <td>
              <Button variant="warning" key={index}
                disabled={stopwatchMap.get(index) ? !stopwatchMap.get(index).isActive : false}
                onClick={()=> (lapStopWatch(index, Date.now()))}>
                  Lap
              </Button>
            </td>
            <td>
              <Button variant="dark" key={index}
                disabled={stopwatchMap.get(index) ? stopwatchMap.get(index).isActive : false}
                onClick={()=> (removeAthlete(index))}>
                  Remove
              </Button>
            </td>
          </tr>
        
      ))}
    </>    
  )
}

function App() { 
  return (
    <>
    <Table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Time</th>
          <th>Lap</th>
          <th>Start</th>
          <th>Stop</th>
          <th>Lap</th>
        </tr>
      </thead>
      <tbody>
        <AthleteTableRows/> 
      </tbody>
    </Table>
    </>    
  );
}

export default App;
