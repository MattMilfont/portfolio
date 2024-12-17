const sessions = new Map<string, any>();

export const setSession = (sessionKey: string, userData: any) => {
  sessions.set(sessionKey, userData); 
};

export const getSession = (sessionKey: string) => {
  return sessions.get(sessionKey); 
};

export const removeSession = (sessionKey: string) => {
  sessions.delete(sessionKey);
};
