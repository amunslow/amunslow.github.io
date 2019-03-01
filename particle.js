let particles = []; //array of particles
var lastEntry = 0;

function setup() {
	createCanvas(600,400);
	for (let i = 0; i < 100; i++) {
		let p = new Particle();
		particles.push(p);
	}
}

function draw() {
	background(0);
	var url = "https://spreadsheets.google.com/feeds/list/1PEWp_nAbiL6I9XDJehF0Ihq0-aixK1Odk8rRidzLHrY/od6/public/values?alt=json";


	$.getJSON(url, function(data) {
			var entry = data.feed.entry;
			var numEntries = data.feed.openSearch$totalResults.$t;
			if (numEntries == lastEntry) { //no entries/no updates
				return;
			} else {
				$(entry).each(function() {
					//var pmfine = parseInt(this.gsx$pmfine.$t);
					var pm10 = parseInt(this.gsx$pm10.$t);
					var index = parseInt(this.gsx$index.$t);

					if (index > lastEntry) {
				
						for (let i = 0; i < pm10; i++) {
							particles[i].update();
							particles[i].show();
						}
						
					}
				
				});
				lastEntry = numEntries;
				
			}
			
	});

}

class Particle {

	constructor() {
		this.x = 300;
		this.y = 380;
		this.vx = random(-1, 1);
		this.vy = random(-5, -1);
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
	}

	show() {
		stroke(255);
		fill(255,10);
		ellipse(this.x, this.y, 16);
	}
}
