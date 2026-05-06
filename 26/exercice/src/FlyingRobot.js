import Robot from "./Robot"

export default class FlyingRobot extends Robot {
    constructor (name, legs, wings) {

        super(name, legs)
        
        this.wings = wings
    }
}
