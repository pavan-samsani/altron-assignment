const nodejs = {
  id: "1",
  name: "Node.js",
};

const react = {
  id: "2",
  name: "React",
};

const python = {
  id: "3",
  name: "Python",
};

const css = {
  id: "4",
  name: "CSS",
};

const html = {
  id: "5",
  name: "HTML",
};

const mongodb = {
  id: "6",
  name: "MongoDB",
};

const postgres = {
  id: "7",
  name: "PostgreSQL",
};

const enzyme = {
  id: "8",
  name: "Enzyme",
};

const frontend = {
  id: "1",
  name: "Front End",
  skills: ["2", "4", "5", "8"],
};

const backend = {
  id: "2",
  name: "Back End",
  skills: ["1", "3", "6", "7"],
};

const data = {
  Area: {
    1: frontend,
    2: backend,
  },
  Skill: {
    1: nodejs,
    2: react,
    3: python,
    4: css,
    5: html,
    6: mongodb,
    7: postgres,
    8: enzyme,
  },
};

let nextSkill = 9;

function createSkill(skillName, areaId) {
  const newSkill = {
    id: String(nextSkill++),
    name: skillName,
  };
  data.Skill[newSkill.id] = newSkill;
  data.Area[areaId].skills.push(newSkill.id);
  return newSkill;
}

function getSkill(id) {
  return data.Skill[id];
}

function getArea(id) {
  return data.Area[id];
}

function getBackEnd() {
  return backend;
}

function getFrontEnd() {
  return frontend;
}

module.exports = {
  createSkill,
  getSkill,
  getArea,
  getBackEnd,
  getFrontEnd,
};
