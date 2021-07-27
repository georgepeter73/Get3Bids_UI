//`.env.ts` is generated by the `npm run env` command
import env from "./.env";
export const environment = {
  production: false,
  version: env.npm_package_version,
  serverUrl: "/api",
  envName: "uat",
  API_URL: "https://uatbff.loanhouse.us",
  is_taxonomy_static: false,
  is_zip_static: false,
  is_common_service_static: false,
  is_ob_service_static: false,
  is_floify_service_static: false,
  recapture_site_key: "6LfCHuMUAAAAADoTzhklZiSjcQLT1wZ7N_5g5hGy",
  DEFAULT_CREDIT_SCORE: 620
};
export const awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "us-east-1:f0f45421-1503-4fea-a4af-4bf3e017b265",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_UsS81YEfj",
  "aws_user_pools_web_client_id": "43t72tpr9cv5kstovra8pl0ebc",
  "oauth": {},
  "aws_appsync_graphqlEndpoint": "https://gwf65nqp3vbt3izcp52uknale4.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_content_delivery_bucket": "lsposb2bui-dev-20210708144548-hostingbucket-dev",
  "aws_content_delivery_bucket_region": "us-east-1",
  "aws_content_delivery_url": "http://lsposb2bui-dev-20210708144548-hostingbucket-dev.s3-website-us-east-1.amazonaws.com"
};
