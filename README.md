# Angular Mentoring

## Task 8. HTTP
- JSON Server based backend with seeded DB initialization
- Protected API with authorization, internal user and sessions management
- AuthService moved to SharedModule, integrated with the API
- CoursesService integrated with the API. HTTP methods user: GET, POST, PUT, DELETE
- Courses API supports pagination requests accepting start and count GET parameters
- Load More Courses uses the pagination, disabled when reaching the end of the list
- Server side search using the query GET parameter, emtry string is not sent to server
- AddCourseComponent, EditCourseComponent and delete course button using the API
- HTTP interceptor adding the token stored in LocalStorage as the Authorization header

Coverage
```
HeadlessChrome 68.0.3440 (Windows 10.0.0): Executed 173 of 173 SUCCESS (14.594 secs / 14.429 secs)
10 08 2018 19:18:48.670:DEBUG [reporter.coverage-istanbul]: Writing coverage reports: [ 'text', 'lcov' ]
--------------------------------------------------|----------|----------|----------|----------|-------------------|
File                                              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------------------------------------------|----------|----------|----------|----------|-------------------|
All files                                         |      100 |      100 |      100 |      100 |                   |
 src                                              |      100 |      100 |      100 |      100 |                   |
  polyfills.ts                                    |      100 |      100 |      100 |      100 |                   |
  test.ts                                         |      100 |      100 |      100 |      100 |                   |
 src/app                                          |      100 |      100 |      100 |      100 |                   |
  app.component.ts                                |      100 |      100 |      100 |      100 |                   |
  app.routing.paths.ts                            |      100 |      100 |      100 |      100 |                   |
 src/app/core                                     |      100 |      100 |      100 |      100 |                   |
  core.module.ts                                  |      100 |      100 |      100 |      100 |                   |
 src/app/core/interceptors                        |      100 |      100 |      100 |      100 |                   |
  auth-interceptor.ts                             |      100 |      100 |      100 |      100 |                   |
  index.ts                                        |      100 |      100 |      100 |      100 |                   |
 src/app/core/services                            |      100 |      100 |      100 |      100 |                   |
  config.service.ts                               |      100 |      100 |      100 |      100 |                   |
  index.ts                                        |      100 |      100 |      100 |      100 |                   |
  local-storage.service.ts                        |      100 |      100 |      100 |      100 |                   |
  window-ref.service.ts                           |      100 |      100 |      100 |      100 |                   |
 src/app/courses                                  |      100 |      100 |      100 |      100 |                   |
  courses.module.ts                               |      100 |      100 |      100 |      100 |                   |
  courses.routing.module.ts                       |      100 |      100 |      100 |      100 |                   |
  courses.routing.paths.ts                        |      100 |      100 |      100 |      100 |                   |
  courses.service.ts                              |      100 |      100 |      100 |      100 |                   |
 src/app/courses/add-course                       |      100 |      100 |      100 |      100 |                   |
  add-course.component.ts                         |      100 |      100 |      100 |      100 |                   |
 src/app/courses/breadcrumbs                      |      100 |      100 |      100 |      100 |                   |
  breadcrumbs.component.ts                        |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-add-button                |      100 |      100 |      100 |      100 |                   |
  course-add-button.component.ts                  |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-date                      |      100 |      100 |      100 |      100 |                   |
  course-date.component.ts                        |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-duration                  |      100 |      100 |      100 |      100 |                   |
  course-duration.component.ts                    |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-list                      |      100 |      100 |      100 |      100 |                   |
  course-list.component.ts                        |      100 |      100 |      100 |      100 |                   |
  order-by.pipe.ts                                |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-list/course-list-item     |      100 |      100 |      100 |      100 |                   |
  course-list-item.component.ts                   |      100 |      100 |      100 |      100 |                   |
  course.model.ts                                 |      100 |      100 |      100 |      100 |                   |
  duration.pipe.ts                                |      100 |      100 |      100 |      100 |                   |
  highlight.directive.ts                          |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-list/courses-list-no-data |      100 |      100 |      100 |      100 |                   |
  courses-list-no-data.component.ts               |      100 |      100 |      100 |      100 |                   |
 src/app/courses/course-search                    |      100 |      100 |      100 |      100 |                   |
  course-search.component.ts                      |      100 |      100 |      100 |      100 |                   |
  search.pipe.ts                                  |      100 |      100 |      100 |      100 |                   |
 src/app/courses/courses                          |      100 |      100 |      100 |      100 |                   |
  courses.component.ts                            |      100 |      100 |      100 |      100 |                   |
 src/app/courses/edit-course                      |      100 |      100 |      100 |      100 |                   |
  edit-course.component.ts                        |      100 |      100 |      100 |      100 |                   |
 src/app/footer                                   |      100 |      100 |      100 |      100 |                   |
  footer.component.ts                             |      100 |      100 |      100 |      100 |                   |
 src/app/header                                   |      100 |      100 |      100 |      100 |                   |
  header.component.ts                             |      100 |      100 |      100 |      100 |                   |
 src/app/login                                    |      100 |      100 |      100 |      100 |                   |
  login.component.ts                              |      100 |      100 |      100 |      100 |                   |
 src/app/logo                                     |      100 |      100 |      100 |      100 |                   |
  logo.component.ts                               |      100 |      100 |      100 |      100 |                   |
 src/app/material                                 |      100 |      100 |      100 |      100 |                   |
  material.module.ts                              |      100 |      100 |      100 |      100 |                   |
 src/app/material/dialog                          |      100 |      100 |      100 |      100 |                   |
  dialog.service.ts                               |      100 |      100 |      100 |      100 |                   |
 src/app/material/dialog/confirm-dialog           |      100 |      100 |      100 |      100 |                   |
  confirm-dialog.component.ts                     |      100 |      100 |      100 |      100 |                   |
 src/app/not-found                                |      100 |      100 |      100 |      100 |                   |
  not-found.component.ts                          |      100 |      100 |      100 |      100 |                   |
 src/app/shared                                   |      100 |      100 |      100 |      100 |                   |
  shared.module.ts                                |      100 |      100 |      100 |      100 |                   |
 src/app/shared/guards                            |      100 |      100 |      100 |      100 |                   |
  auth.guard.ts                                   |      100 |      100 |      100 |      100 |                   |
  index.ts                                        |      100 |      100 |      100 |      100 |                   |
 src/app/shared/models                            |      100 |      100 |      100 |      100 |                   |
  index.ts                                        |      100 |      100 |      100 |      100 |                   |
  user.model.ts                                   |      100 |      100 |      100 |      100 |                   |
 src/app/shared/services                          |      100 |      100 |      100 |      100 |                   |
  auth.service.ts                                 |      100 |      100 |      100 |      100 |                   |
  index.ts                                        |      100 |      100 |      100 |      100 |                   |
--------------------------------------------------|----------|----------|----------|----------|-------------------|
```
Run Coverage
```
npm run test:coverage
```

## Branches
 - Task1. Webpack/Typescript/Angular Intro
 - Task2. Components
 - Task3. Unit testing
 - Task4. Directives + Pipes
 - Task5. Modules & Services
 - Task6. Change detection
 - Task7. Routing
 - Task8. HTTP

## Run Development Server
```
npm run dev
```
Enjoy @ http://localhost:4200/

## Run Production Build
```
npm run prod
```
Enjoy @ http://localhost:3000/
