export const endpoints = {
  auth: {
    login: "users/login",
    register: "users/register",
    verifyUser: "users/verify",
    forgotPassword: "users/forgotpassword",
    resetPassword: "users/resetpassword",
    logout: "users/logout",
    accent: "users/getaccent"

  },
  getUserTasks: "dialogue/getusertasks",
  getWords: "word",
  user: {
    getUserInfo: "users/getuser",
  },
  saveRecording: "audio/create",
  suggestWord: "feedback/create",
};
