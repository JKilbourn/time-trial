// TODO: Would like to have this in a seperate location in the repository and then let each project pull it in as needed.  For instance when I create 
// the web service to save stop watches I should be able to just pull this in.  
// TODO: Add unit tests for this class
class StopWatch {
    startTimeMS: number = 0;
    stopTimeMS: number = 0;
    isActive: boolean = false;
    runningTimeMS: number = 0;

    constructor(isActive: boolean, startTimeMS: number) {
        this.startTimeMS = startTimeMS;
        this.isActive = isActive;
        this.setRunningTime(Date.now());
    }

    setRunningTime (time: number): void {
        this.runningTimeMS = time - this.startTimeMS;
    }

    setStopTimeMS (time: number): void {
        this.stopTimeMS = time;
    }

    setIsActive (isActive: boolean): void {
        this.isActive = isActive;
    }
}

export { StopWatch }