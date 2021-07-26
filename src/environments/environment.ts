// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// `.env.ts` is generated by the `npm run env` command
import env from "./.env";

export const environment = {
  production: false,
  version: env.npm_package_version + "-dev",
  serverUrl: "/api",
  envName: "DEV",
  API_URL: "https://uatbff.loanhouse.us",
  is_taxonomy_static: false,
  is_zip_static: false,
  is_common_service_static: false,
  is_ob_service_static: false,
  is_floify_service_static: false,
  recapture_site_key: "6LfZHuMUAAAAAHERjPWL44BWLdtm6Q6A2qNkgqMm",
  DEFAULT_CREDIT_SCORE: 620
};
