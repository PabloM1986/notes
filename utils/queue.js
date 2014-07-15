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
    var self = this;
    self._async = true;
    return function () {
        self.next();
    }
};

Queue.prototype.abort = function () {
    this.isRunning = false;
};

Queue.prototype.run = function () {
    var current = this._queue.shift();
    this.isRunning = true;
    if (current) {
        do {
            current(this);
        } while ((current = this._queue.shift()) && !this._async);
        if (!this._async) {
            this.finished();
        }
    }
};

Queue.prototype.next = function () {
    this._async = false;
    if (this.isRunning) {
        if (this._queue.length > 0) {
            this._queue.shift()(this);
        }
        if (this._queue.length == 0) {
            this.finished();
        }
    } else {
        throw new Error("Execution aborted unexpectedly");
    }
};

Queue.prototype.add = function (callback) {
    if (typeof callback !== "function") {
        throw new Error("Callback must be a function");
    }
    this._queue.push(callback);
};

Queue.prototype.finished = function () {
    console.log("finished");
};

function testSync () {
    var result = "",
        expected = "1234",
        i;

    var testQueue = new Queue();
    for (i=1;i<=4;i++) {
        testQueue.add(function (i) {
            return function () {
                result += i;
            }
        }(i));
    }
    testQueue.run();
    if (result == expected) {
        console.log("Sync test passed");
    } else {
        console.error("Sync test failed");
    }
}

function testAsync () {
    var result = "",
        expected = "1234";

    var testQueue = new Queue();

    testQueue.add(function (q) {
        var done = q.async();
        setTimeout(function () {
            result += 1;
            done();
        }, 1000);
    });
    testQueue.add(function (q) {
        var done = q.async();
        setTimeout(function () {
            result += 2;
            done();
        }, 500);
    });
    testQueue.add(function (q) {
        var done = q.async();
        setTimeout(function () {
            result += 3;
            done();
        }, 1000);
    });
    testQueue.add(function (q) {
        var done = q.async();
        setTimeout(function () {
            result += 4;
            done();
        }, 500);
    });

    testQueue.finished = function () {
        if (result == expected) {
            console.log("Async test passed");
        } else {
            console.error("Async test failed");
        }

    };

    testQueue.run();
}