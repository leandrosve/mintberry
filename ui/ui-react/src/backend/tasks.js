export default [
  {
    id: 1,
    title: "My first task",
    description: "Tengo que hacer la pagina",
    state: "ACTIVE",
    createdAt: Date.parse("2020-10-06T16:10:15-03:00"),
    startedAt: new Date().getTime(),
    expiresAt: Date.parse("2020-11-10T16:10:15-03:00"),
    image:
      "https://www.freevector.com/uploads/vector/preview/2830/FreeVector-Computer-Screen-Graphics.jpg",
  },
  {
    id: 2,
    title: "My second task",
    description: "Tengo que hacer la pagina",
    state: "PAUSED",
    createdAt: Date.parse("2020-10-06T16:10:15-03:00"),
    expiresAt: Date.parse("2020-10-06T16:13:15-03:00"),
    image:
      "https://www.freevector.com/uploads/vector/preview/2830/FreeVector-Computer-Screen-Graphics.jpg",
  },
  {
    id: 3,
    title: "My third task",
    description: "Tengo que hacer la pagina",
    state: "FINISHED",
    finishedAt: new Date().getTime(),
    createdAt: Date.parse("2020-10-06T16:10:15-03:00"),
    startedAt: Date.parse("2020-09-06T16:10:15-03:00"),
    expiresAt: Date.parse("2020-10-08T16:13:15-03:00"),
    image:
      "https://www.freevector.com/uploads/vector/preview/2830/FreeVector-Computer-Screen-Graphics.jpg",
  },
];
