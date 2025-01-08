const sessions = new Map<string, unknown>();

export const setSession = <T>(sessionKey: string, userData: T): void => {
  sessions.set(sessionKey, userData);
};

export const getSession = <T>(sessionKey: string): T | undefined => {
  return sessions.get(sessionKey) as T | undefined;
};

export const removeSession = (sessionKey: string): void => {
  sessions.delete(sessionKey);
};
