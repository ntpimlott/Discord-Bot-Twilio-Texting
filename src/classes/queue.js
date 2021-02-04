class Queue {
    constructor(){
        this.array = [];
    }

    enqueueCommand(command){
        this.array.push(command);
    }

    dequeueCommand(){
        return this.array.shift();
    }

    isEmpty(){
        if(this.array.length == 0){
            return true;
        }
        return false;
    }

    queueLength(){
        return this.array.length;
    }
}
module.exports = Queue