import { StopWatch } from "../domain/StopWatch";

test('1000 MS = 1 Second', () => {    
    let stopWatch = new StopWatch(true, Date.now());
    stopWatch.setRunningTime(1000+stopWatch.startTimeMS);
    expect(stopWatch.formatedRunningTime).toEqual("00:00:01.00");
});

test('1500 MS = 1.50 Second', () => {    
    let stopWatch = new StopWatch(true, Date.now());
    stopWatch.setRunningTime(1500+stopWatch.startTimeMS);
    expect(stopWatch.formatedRunningTime).toEqual("00:00:01.50");
});

test ('60000 MS = 1 Minute', () => {
    let stopWatch = new StopWatch(true, Date.now());
    stopWatch.setRunningTime(60000+stopWatch.startTimeMS);
    expect(stopWatch.formatedRunningTime).toEqual("00:01:00.00");
});

test ('3600000 MS = 1 hour', () => {
    let stopWatch = new StopWatch(true, Date.now());
    stopWatch.setRunningTime(3600000+stopWatch.startTimeMS);
    expect(stopWatch.formatedRunningTime).toEqual("01:00:00.00");
});

// test laps display one lap and multiple laps
// test set lap
// test running lap time