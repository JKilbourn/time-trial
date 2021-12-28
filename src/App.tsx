import React, { useEffect, ReactNode, useState } from 'react';
import './App.css';
import {Table, Button} from 'react-bootstrap';
import {StopWatch} from '../src/domain/StopWatch';


function AthleteTableRows <ListItem> ({
  items, 
  render,
}: {
  items: ListItem[],
  render:(item:ListItem) => ReactNode
}) {
  
  const [stopwatchMap, setStopWatch] = useState(new Map());

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
  return (
    <>      
     {items.map((item, index)=> (
        <tr key={index}>
          <td>{index}</td>
          <td>{render(item)}</td>
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
        <AthleteTableRows 
          items={["Athlete 1", "Athlete 2"]}
          render={(item:string) => <>{item}</>}
        ></AthleteTableRows>
      </tbody>
    </Table>
    </>    
  );
}

export default App;
