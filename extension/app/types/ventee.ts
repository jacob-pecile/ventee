export enum UserStatus {
    Open = 0,
    Loading = 1,
    Vented = 2
}

export const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.COGNITO_APP_CLIENT_ID
};