export interface User {
    status: UserStatus;
    userName?: string;
    email?: string;
}

export enum UserStatus {
    UNAUTHENTICATED = 0,
    AUTHENTICATED = 1,
    SIGN_UP = 2,
    EMAIL_CONFIRMATION = 3,
    PASSWORD_RESET = 4,
    SEND_VERIFICATION = 5
}