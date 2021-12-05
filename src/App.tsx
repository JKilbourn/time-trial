import React, { useEffect, ReactNode, useState } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {StopWatch} from '../src/domain/StopWatch';

/* Adds the table rows for each athlete */
function AthleteTableRows <ListItem> ({
  items, 
  render,
}: {
  items: ListItem[],
  render:(item:ListItem) => ReactNode
}) {
  
  const [stopwatchMap, setStopWatch] = useState(new Map());  
  // TODO: check if the stop watch already exists.  If so then set the running time and set isActive to true
  const createStopWatch = (key: number, startTimeMS: number) => {
    let stopWatch = new StopWatch(true, startTimeMS);
    setStopWatch(new Map(stopwatchMap.set(key,stopWatch)));
  }
  
  const stopStopWatch = (key: number, stopTimeMS: number) => {
    let tempMap = new Map(stopwatchMap);
    let stopWatch = tempMap.get(key);
    stopWatch.setStopTimeMS(stopTimeMS);
    stopWatch.setIsActive(false);
    setStopWatch(new Map(tempMap));
  }
   
  useEffect(() => {
    let intervalId: NodeJS.Timeout ; 
    let tempMap = new Map(stopwatchMap); 
    intervalId = setInterval(() => {
      tempMap.forEach((stopwatch: StopWatch, key: number) => {
        if (stopwatch.isActive) {
          stopwatch.setRunningTime(Date.now());
          tempMap.set(key, stopwatch);
        }
      });
      setStopWatch(new Map(tempMap));
    }, 250)  
    return () => clearInterval(intervalId);               
  }, [stopwatchMap])  
  return (
    <>    
     {items.map((item, index)=> (
        <tr key={index}>
          <td>{index}</td>
          <td>{render(item)}</td>
          <td>{stopwatchMap.get(index) ? stopwatchMap.get(index).runningTimeMS : 0}</td>
          {/* TODO: Disable if stopwatch.isActive is true */}
          <td>
            <Button variant="primary" key={index} 
              onClick={()=>(createStopWatch(index, Date.now()))}>
                Start
            </Button> 
          </td>
          <td>
            {/* TODO: Disable if stopwatch.isActive is false */}
            <Button variant="danger" key={index}
              onClick={()=> (stopStopWatch(index, Date.now()))}>
                Stop
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
          <th>Start</th>
          <th>Stop</th>
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
