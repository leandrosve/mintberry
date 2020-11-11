export default {
  translation: {
    home: "Home",
    "welcomeMessage": "Welcome <1>{{name}}</1>, you have <1><0>{{count}}</0></1> active tasks.",
    lang: "Language",
    login: "Log in",
    signup: "Sign up",
    logout: "Log out",
    expired: "Expired",
    expires: "Expires",
    "ACTIVE": "Active",
    "RUNNING": "Active",
    "READY": "Ready",
    "PAUSED": "Paused",
    "CANCELLED": "Cancelled",
    "FINISHED": "Finished",
    createdDate: "Created at",
    expiracyDate: "Expiracy date",
    tasks: "Tasks",
    finishedTasks: "Finished tasks",
    pausedTasks: "Paused tasks",
    activeTasksCount: "You have {{count}} active task/s",
    noTasks: "No tasks have been found.",
    finishedIn: "Finished in",
    all: "All",
    credits:"By <1>Leandro Svetlich</1>. Made with React JS and Express.js",
    fields: {
      username: "Username",
      email: "Email",
      name: "Name",
      password: "Password",
      passwordConfirm: "Confirm password",
      title: "Title",
      description: "Description",
      validation: {
        emailInvalid: "Must be an email address.",
        passwordWeak:
          "Must be at least eight (8) characters long and contain a number or symbol",
        tooShort: "Must be at least {{minLength}} characters long.",
        tooLong: "Must be at most {{maxLength}} characters long.",
        required: "This field is required.",
        usernameTaken: "Username is already taken.",
        passwordsDontMatch: "Passwords don't match",
        pastDate: "Must be a date that's later than right now."
      },
    },
    links: {
      signup: "Dont have an account? Sign up here!",
      login: "Already have an account? Log in here!",
    },
    success: {
      signup: "Signed up succesfully. Please log in!",
      taskDelete: "Task was successfully deleted!",
      taskAdd: "Task was successfully added!",
      taskEdit: "Task was succesfully updated!",
    },
    error:{
      notFound:"Not found",
      resourceNotFound: "Sorry, we couldn't find the requested resource",
      taskAdd:"There was an error while trying to create the task.",
      taskStatus:"There was an error while trying to change the task status.",
      sessionExpired:"Session expired, please log in again!"
    },
    actions: {
      add: "Add",
      taskAdd: "Add task",
      taskEdit: "Edit task",
      taskRestart: "Restart task {{taskName}}",
      imageUpload: "Upload image",
      avatarChange: "Change avatar",
      start: "Start",
      pause: "Pause",
      stop: "Stop",
      finish: "Finalize",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
    },
    dates: {
      thisMonth: "this month",
      seconds: "second[s]",
      minutes: "minute[s]",
      hours: "hour[s]",
      days: "day[s]",
    },
    confirmation: {
      accept: "Accept",
      cancel: "Cancel",
      taskDelete: "Are you sure you want to delete this task?",
      taskStop: "Are you sure you want to cancel this task?",
    }
  },
};
