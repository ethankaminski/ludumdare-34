function SingleStat(text, pos, cumulative) {
	this.text = text;
	this.pos = pos;
	this.val = cumulative ? 0 : -1;
	this.cumulative = cumulative;
}

SingleStat.prototype.update = function(val) {
	if (this.cumulative) {
		this.val += val;
		this.updateSprite();
	} else {
		if (val > this.val) {
			this.val = val;
			this.updateSprite();
		}
	}
}

SingleStat.prototype.createSprite = function() {
	this.sprite = game.add.text(this.pos.x, this.pos.y, 'test', {
		font: '16px arial',
		fill: 'black',
		align: 'left'
	});
	this.sprite.fixedToCamera = true;
	this.updateSprite();

	return;
	var bmd = game.make.bitmapData(200, 50);
	this.bmd = bmd;
	this.bmd.ctx.fillStyle = 'black';
	this.bmd.ctx.font = '16px Revalia';
	this.updateSprite();
	//this.sprite = game.add.sprite(this.pos.x, this.pos.y, bmd);
}

SingleStat.prototype.updateSprite = function() {
	if (!this.sprite) {
		return;
	}
	var text = this.text + ': ' + this.val;
	this.sprite.setText(text);
}

function Stats() {
	this.stats = {};
	this.defineStat('treeCount', "Number of trees", new Phaser.Point(10, 10), true);
	this.defineStat('maxSpeed', "Max speed", new Phaser.Point(10, 50), false);
	this.defineStat('maxHeight', "Max height", new Phaser.Point(10, 100), false);
}

Stats.prototype.defineStat = function(name, text, pos, cumulative) {
	var stat = new SingleStat(text, pos, cumulative);
	this.stats[name] = stat;
}

Stats.prototype.show = function() {
	for (var name in this.stats) {
		var stat = this.stats[name];
		console.log(name, stat);
		stat.createSprite();
	}
}

Stats.prototype.update = function(name, val) {
	this.stats[name].update(val);
}