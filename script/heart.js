"use strict";

var Heart = function() {

    this.level = 0;
    this.beat = false;
    this.timer = 0;

    return this;
};

Heart.prototype.update = function(dt) {

    this.timer += dt;

    var levelTimings = HEARTBEAT_LEVELS[this.level];

    if (this.beat) {
        if (this.timer > levelTimings.beat) {
            this.timer -= levelTimings.beat;
            this.beat = false;
        }
    } else {
        if (this.timer > levelTimings.delay) {
            this.timer -= levelTimings.beat;
            this.beat = true;
        }
    }

}
