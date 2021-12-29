class Athlete {
    id: number = 0;
    firstName: String  = "";
    lastName: String = "";

    
    
    
    getFirstNameLastName (): String {
        return this.firstName + " "  + this.lastName;
    }
}

export {Athlete}