export interface Response {
    statusCode: number;
    body?: any;
    headers: any;
}

export interface Vent {
    ventId?: string;
    vent: string;
    comment?: string;
    url: string;
    timeOfCreation?: number;
}