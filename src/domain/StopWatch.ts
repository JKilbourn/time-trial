// TODO: Would like to have this in a seperate location in the repository and then let each project pull it in as needed.  For instance when I create 

// the web service to save stop watches I should be able to just pull this in.  
class StopWatch {
    startTimeMS: number = 0;
    stopTimeMS: number = 0;
    isActive: boolean = false;
    runningTimeMS: number = 0;
    formatedRunningTime: String = '';
    lapsMS = new Array ();
    lapsformated = new Array ();
    formatedRunningLapTime: String = '';  
    runningLapTimeMS: number = 0;
    lapsDisplayString: String = '';

    constructor(isActive: boolean, startTimeMS: number) {
        this.startTimeMS = startTimeMS;
        this.isActive = isActive;
        this.setRunningTime(Date.now());
    }

    setRunningTime (time: number): void {
        this.runningTimeMS = time - this.startTimeMS;
        this.formatedRunningTime = this.getFormatedTime(this.runningTimeMS);
        // update formated lap time as well only if a lap is running
    }

    setStopTimeMS (time: number): void {
        this.stopTimeMS = time;
        // stopTime should be used to calculate the last running time       
    }

    setIsActive (isActive: boolean): void {
        this.isActive = isActive;
    }

    setLap (time: number): void {
        let templapsTime = 0;
        let lapTime =0;
        if(this.lapsMS.length > 0) {
            for (let lapMS of this.lapsMS) {
                lapTime = lapTime + lapMS;            
            }
            templapsTime = lapTime + this.startTimeMS
            lapTime = time - templapsTime;                        
        }
        else {
            lapTime = time - this.startTimeMS;
        }
        this.lapsMS.push(lapTime);   
        this.lapsformated.push("Lap " + (this.lapsformated.length + 1) + " " + this.getFormatedTime(lapTime));
        this.formatedRunningLapTime = this.getFormatedTime(lapTime);
    }

    setRunningLapTime(time: number): void {
       let lapTime = 0;
        if (this.lapsformated.length > 0) {
            for (let lapMS of this.lapsMS) {
                lapTime = lapTime + lapMS; 
            }
            this.runningLapTimeMS = time - (lapTime + this.startTimeMS);
            this.formatedRunningLapTime = this.getFormatedTime(this.runningLapTimeMS);
            this.setLapsDisplay();
        } 
    }

    setLapsDisplay (): void {
        let count = 0;
        let lapString = '';
        if ((this.isActive && this.lapsformated.length > 0) || (!this.isActive && this.lapsformated.length > 1)) {
            for (let lapStr of this.lapsformated) {
                count ++;
                lapString = lapString + lapStr + ' ';
            }
            if (count > 0) {
                if (this.isActive)
                    lapString = lapString + ' ' + 'Lap ' + (count+1)  + ': ' + this.formatedRunningLapTime;
            }
        } 

        this.lapsDisplayString = lapString;
    }

    private getFormatedTime(n: number): String {   
        let hours, minutes, seconds, milliseconds;  
        let tempDate = new Date(n)
        if (n>0) {              
             hours = tempDate.getUTCHours();
             minutes = tempDate.getUTCMinutes();
             seconds = tempDate.getUTCSeconds();
             milliseconds = tempDate.getUTCMilliseconds();
            milliseconds = (Math.floor(milliseconds/10));
        } else {
             hours = 0
             minutes = 0
             seconds = 0
             milliseconds = 0
             milliseconds = 0
        }
        
        return ( this.formatNumber(hours) + ":" + this.formatNumber(minutes) + ":" + 
        this.formatNumber(seconds) + "." + this.formatNumber(milliseconds));
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