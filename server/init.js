const fs = require('fs');
const path = require('path');

const infile = path.resolve(path.join(__dirname, './db-seed.json'));
const outfile = path.resolve(path.join(__dirname, './db.json'));

const dayms = 86400000;                       // milliseconds in a day
const freshDate = Date.now() - 7 * dayms;     // this one will always be fresh
const upcomingDate = Date.now() + 7 * dayms;  // this one will always be upcoming

const initCourse = course => {
  switch(course.creationDate) {
    case '${freshDate}':
      return { ...course, creationDate: freshDate };
    case '${upcomingDate}':
      return { ...course, creationDate: upcomingDate };
  }
  return course;
}

const init = function() {
  const initObj = JSON.parse(fs.readFileSync(infile, 'utf8'));

  const prepObj = {
      ...initObj,
      courses: initObj.courses.map(initCourse),
  }

  fs.writeFileSync(outfile, JSON.stringify(prepObj), 'utf8');
};

module.exports = init;