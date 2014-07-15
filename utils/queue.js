/**
 * Created by pablo on 14/07/14.
 */

/**
 * Asynchronous and synchronous callback queue manager
 */

function Queue () {
    this._queue = [];
    this._async = false;
    this.isRunning = false;
}

Queue.prototype.async = function () {
    this._async = true;
    return function () {
        this.next();
    }
};

Queue.prototype.abort = function () {
    this.isRunning = false;
};

Queue.prototype.run = function () {
    var current = this._queue.pop();
    if (current) {
        if (this._async) {
            current(this);
        } else {
            do {
                current(this);
            } while (current = this._queue.pop() && !this._async);
        }
    }
};

Queue.prototype.next = function () {
    if (this._queue.length > 0 && this.isRunning) {
        this._queue.pop()(this);
    } else {
        throw new Error("Execution aborted unexpectedly");
    }
    if (this._queue.length == 0) {
        this.finished();
    }
};

Queue.prototype.add = function (callback) {
    if (typeof callback !== "function") {
        throw new Error("Callback must be a function");
    }
    this._queue.push(callback);
};

Queue.prototype.finished = function () {};