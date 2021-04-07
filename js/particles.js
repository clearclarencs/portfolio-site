let skillObj;
let fontSize = 32;
var skills = [];

const skillNames = ["Python", "Javascript", "Git", "HTML", "CSS", "SQL", "Linux", "Docker"]

function between(x, min, max) {
  return x >= min && x <= max;
}

function setup() {
  var canvasDiv = document.getElementById('skillBox');
  var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
  canvas.parent('skillBox');
  for (skillName in skillNames){
    x = random(width);
    y = random(height);
    skills.push({"name":skillNames[skillName], "x":x, "y":y, "xspeed": 1, "yspeed":1})
  }
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
    textH = fontSize
    textW = textWidth(skillObj)
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
        if (((skills[skill]["yspeed"] > 0) && (skills[skill]["y"] >= skills[skillOth]["y"])) || ((skills[skill]["yspeed"] < 0) && (skills[skill]["y"] <= skills[skillOth]["y"]))){continue;} // Already travelling away
        if (((skills[skill]["xspeed"] > 0) && (skills[skill]["x"] >= skills[skillOth]["x"])) || ((skills[skill]["xspeed"] < 0) && (skills[skill]["x"] <= skills[skillOth]["x"]))){continue;} // Already travelling away
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