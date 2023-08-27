import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) return null;
   
        const startsWithLetter = /^[A-Za-z]/.test(value);
        
        const hasNumeric = /[0-9]+/.test(value);
        
        const hasSpecialCharacter = /[^A-Za-z 0-9]/g.test(value);

        const passwordIsValid = startsWithLetter && hasNumeric && hasSpecialCharacter

        return !passwordIsValid ? {passwordIsValid:true}: null;
    }

}