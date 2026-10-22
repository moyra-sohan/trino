import { storageService } from './storageService';

const USER_STORAGE_KEY = 'narisetu_user';

export const authService = {
  getCurrentUser() {
    return storageService.getItem(USER_STORAGE_KEY, null);
  },

  setCurrentUser(user) {
    if (user) {
      storageService.setItem(USER_STORAGE_KEY, user);
    } else {
      storageService.removeItem(USER_STORAGE_KEY);
    }
  },

  logout() {
    storageService.removeItem(USER_STORAGE_KEY);
  }
};
