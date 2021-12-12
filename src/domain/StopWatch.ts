// TODO: Would like to have this in a seperate location in the repository and then let each project pull it in as needed.  For instance when I create 
// the web service to save stop watches I should be able to just pull this in.  
// TODO: Add unit tests for this class
class StopWatch {
    startTimeMS: number = 0;
    stopTimeMS: number = 0;
    isActive: boolean = false;
    runningTimeMS: number = 0;
    formatedRunningTime: String = '';

    constructor(isActive: boolean, startTimeMS: number) {
        this.startTimeMS = startTimeMS;
        this.isActive = isActive;
        this.setRunningTime(Date.now());
    }

    setRunningTime (time: number): void {
        this.runningTimeMS = time - this.startTimeMS;
        this.setFormatedTime();
    }

    setStopTimeMS (time: number): void {
        this.stopTimeMS = time;
    }

    setIsActive (isActive: boolean): void {
        this.isActive = isActive;
    }

    setFormatedTime(): void {        
        let tempDate = new Date(this.runningTimeMS);
        let hours = tempDate.getUTCHours();
        let minutes = tempDate.getUTCMinutes();
        let seconds = tempDate.getUTCSeconds();
        let milliseconds = tempDate.getUTCMilliseconds();
        milliseconds = (Math.floor(milliseconds/10));
        
        this.formatedRunningTime = this.formatNumber(hours) + ":" + this.formatNumber(minutes) + ":" + 
        this.formatNumber(seconds) + "." + this.formatNumber(milliseconds);
    }

    private formatNumber(n: number ): String {
        let strFormatNumber="";
        switch (true) {
            case (n<1):
                strFormatNumber = "00";
                break;
            case (n < 10):
                strFormatNumber = "0" + n;
                break;
            default:
                strFormatNumber = n.toString();
        }
        return strFormatNumber;
    }

}

export { StopWatch }