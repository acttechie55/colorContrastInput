import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import instruxTokenJson from '../../shared/data/instruxTokens.json'

@Injectable({
    providedIn: 'root',
})
export class TokenInstruxService {

    private theBoolean: BehaviorSubject<boolean>;
    instruxTokenJson;
    tokenRegExPattern: any = /(\%\%)(\s|[a-zA-Z0-9]){2,}(\%\%)/;


    public getTheBoolean(): Observable<boolean> {
        return this.theBoolean.asObservable();
    }

    constructor() {
        this.theBoolean = new BehaviorSubject<boolean>(false);
    }

    detectToken(value) {
        this.theBoolean.next(value);
    }

    //Takes Json Keys into an array and convert into a regex
    createRegexString() {
        let tokenNameArray = Object.keys(instruxTokenJson);
        let regexArray = [];
        let doublePercentages = "(%%)"
        for (let i = 0; i < tokenNameArray.length; i++) {
            let wordOnly = tokenNameArray[i].substring(2, tokenNameArray[i].length - 2);
            regexArray.push(wordOnly);
        }

        let regexString = doublePercentages + "(" + regexArray.join("|") + ")" + doublePercentages;
        return regexString
    }

    //Convert Token Pattern into a Button
    convertTokenString(initialString: string) {
        console.log(this.createRegexString())
        const regex = new RegExp(this.createRegexString(), "gi");
        initialString = initialString.replace(regex, function (matched) {
            return instruxTokenJson[matched];
        });
        return initialString
    }

    //Returns a true or false value if the string provided possess %%TOKEN_NAME%%
    tokenlistener(string) {
        //Pattern is '%%' + token name + '%%';
        const regex = new RegExp(this.tokenRegExPattern, "gi");
        //If the input contains the above pattern
        if (regex.test(string)) {
            return true
        } else {
            return false
        }
    }

    //Reduces the white space of a string in an editable box 
    reduceWhiteSpace(initialString: string) {
        const regexTest = new RegExp(this.tokenRegExPattern, "gi");
        let matchedTokenArray = initialString.match(regexTest);

        for (let i = 0; i < matchedTokenArray.length; i++) {


            initialString = initialString.replace(matchedTokenArray[i], matchedTokenArray[i].toLowerCase().split(" ").join(""))
        }
        return initialString
    }


}