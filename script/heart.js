"use strict";

var Heart = function() {

    this.level = 0;
    this.beat = false;
    this.timer = 0;

    this.HP_MAX = HEARTBEAT_LEVELS[HEARTBEAT_LEVELS.length - 1].hpEnd
    this.hp = this.HP_MAX / 2;

    return this;
};

Heart.prototype.update = function(dt, interacResult) {

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

    this.hp = clamp(this.hp + interacResult.hp, 0, this.HP_MAX);
    if (this.hp == 0) {
        // R.I.P
    } else if (this.hp < HEARTBEAT_LEVELS[this.level].hpStart) {
        this.level--;
    } else if (this.hp > HEARTBEAT_LEVELS[this.level].hpEnd) {
        this.level++;
    }
}
