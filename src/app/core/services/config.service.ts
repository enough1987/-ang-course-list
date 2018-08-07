import { InjectionToken } from '@angular/core';

export const config = {
  apiBaseUrl: 'http://127.0.0.1:3000/api',
  apiEndpoints: {
    login: 'login',
    logout: 'logout',
    user: 'user',
    courses: 'courses',
  }
};

export const ConfigService = new InjectionToken<object>('config');
