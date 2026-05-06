export default class Robot {

    constructor(name, legs) {
        this.name = name
        this.legs = legs
    }
    
    hello() {
        console.log('hello' + this.name)
    };
};
