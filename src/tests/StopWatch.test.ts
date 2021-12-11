import { StopWatch } from "../domain/StopWatch";

test('1000 MS = 1 Second', () => {    
    let stopWatch = new StopWatch(true, Date.now());
    stopWatch.setRunningTime(1000+stopWatch.startTimeMS);
    expect(stopWatch.runningTimeMS).toEqual(1000);
});