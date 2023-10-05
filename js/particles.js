let skillObj;
let fontSize = 32;
var skills = [];

const skillNames = ["Python", "JavaScript", "Git", "HTML", "CSS", "SQL", "Linux"]

function between(x, min, max) {
  return x >= min && x <= max;
}

function setup() {
  var canvasDiv = document.getElementById('skillBox');
  var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
  canvas.parent('skillBox');
  skills = [
    {"name":"Python", "x":random(30,70), "y":random(30,70), "xspeed": 0.5, "yspeed":0.5},
    {"name":"JavaScript", "x":random(280,320), "y":random(30,70), "xspeed": 0.5, "yspeed":0.5},
    {"name":"Git", "x":random(580,620), "y":random(30,70), "xspeed": 0.5, "yspeed":0.5},
    {"name":"HTML", "x":random(30,70), "y":random(120,170), "xspeed": 0.5, "yspeed":0.5},
    {"name":"CSS", "x":random(30,70), "y":random(280,320), "xspeed": 0.5, "yspeed":0.5},
    {"name":"SQL", "x":random(230,270), "y":random(120,180), "xspeed": 0.5, "yspeed":0.5},
    {"name":"Linux", "x":random(580,620), "y":random(580,620), "xspeed": 0.5, "yspeed":0.5},
  ];

}

function windowResized() {
  canvasDiv = document.getElementById('skillBox');
  resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
}

function draw() {
  clear();
  textSize(fontSize);
  for (skill in skills){
    skillObj = skills[skill]["name"];
    textH = fontSize + 5
    textW = textWidth(skillObj) + 5
    text(skillObj, skills[skill]["x"], skills[skill]["y"]);
    fill(29, 161, 242, 250);

    skills[skill]["x"] = skills[skill]["x"] + skills[skill]["xspeed"];
    skills[skill]["y"] = skills[skill]["y"] + skills[skill]["yspeed"];
    if (skills[skill]["x"] + textW >= width) {
      skills[skill]["xspeed"] = -abs(skills[skill]["xspeed"]);
      skills[skill]["x"] = width - textW;
    } else if (skills[skill]["x"] <= 0) {
      skills[skill]["xspeed"] = abs(skills[skill]["xspeed"]);
      skills[skill]["x"] = 2;
    }

    for (skillOth in skills){
      if (skill == skillOth){continue;}
      if (between(skills[skillOth]["x"], skills[skill]["x"] - textW, skills[skill]["x"] + textW) && between(skills[skillOth]["y"], skills[skill]["y"] - textH, skills[skill]["y"] + textH)){
        if ((skills[skill]["yspeed"] != skills[skillOth]["yspeed"]) && (skills[skill]["xspeed"] != skills[skillOth]["xspeed"])){ // If travelling diff directions
          if (((skills[skill]["yspeed"] > 0) && (skills[skill]["y"] >= skills[skillOth]["y"])) && ((skills[skill]["yspeed"] < 0) && (skills[skill]["y"] <= skills[skillOth]["y"]))){continue;} // Already travelling away
          if (((skills[skill]["xspeed"] > 0) && (skills[skill]["x"] >= skills[skillOth]["x"])) && ((skills[skill]["xspeed"] < 0) && (skills[skill]["x"] <= skills[skillOth]["x"]))){continue;} // Already travelling away
        }
        skills[skill]["yspeed"] = -skills[skill]["yspeed"];
        skills[skill]["xspeed"] = -skills[skill]["xspeed"];
        skills[skillOth]["yspeed"] = -skills[skillOth]["yspeed"];
        skills[skillOth]["xspeed"] = -skills[skillOth]["xspeed"];
        skills[skillOth]["x"] = skills[skillOth]["x"] + skills[skillOth]["xspeed"];
        skills[skillOth]["y"] = skills[skillOth]["y"] + skills[skillOth]["yspeed"];
        skills[skillOth]["x"] = skills[skillOth]["x"] + skills[skillOth]["xspeed"];
        skills[skillOth]["y"] = skills[skillOth]["y"] + skills[skillOth]["yspeed"];
      }
    }

    if (skills[skill]["y"] >= height) {
      skills[skill]["yspeed"] = -skills[skill]["yspeed"];
      skills[skill]["y"] = height - 1;
    } else if (skills[skill]["y"] <= textH) {
      skills[skill]["yspeed"] = -skills[skill]["yspeed"];
      skills[skill]["y"] = textH + 1;
    }
  }
}