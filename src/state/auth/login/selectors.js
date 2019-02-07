export const isLoginInProgress = ({
  auth: {
    login: { inProgress },
  },
}) => ({ isLoginInProgress: inProgress });
export const getLocation = ({
  auth: {
    login: { country },
  },
}) => ({ country });
