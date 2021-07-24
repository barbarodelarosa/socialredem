// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url:'http://192.168.43.232:8000',
  url:'http://127.0.0.1:8000',
  pathRegister:'/api/auth/register/',
  pathLogin:'/api/auth/login/',
  pathResetPassword:'/api/auth/password-reset/',
  pathPasswordResetConfirm:'/api/auth/password-reset-confirm/',
  pathGetUser:'/api/auth/user/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
