export interface User {
    status: UserStatus;
    userName?: string;
    email?: string;
    authMessage?: string;
}

export enum UserStatus {
    REFRESHING = -1,
    UNAUTHENTICATED = 0,
    AUTHENTICATED = 1,
    SIGN_UP = 2,
    EMAIL_CONFIRMATION = 3,
    PASSWORD_RESET = 4,
    SEND_VERIFICATION = 5
}

export interface ExtraAuthAction {
    text: string;
    onClick: () => void;
}

export interface Vent {
    ventId?: string;
    vent: string;
    comment?: string;
    userName: string;
    url: string;
    timeOfCreation?: number;
}