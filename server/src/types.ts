export interface Response {
    statusCode: number;
    body?: any;
    headers: any;
}

export interface Vent {
    ventId?: string;
    vent: string;
    comment?: string;
    userId: string;
    url: string;
    timeOfCreation?: number;
}

export interface Tag {
    tagId?: string;
    tagName: string;
    createdById: string;
}

export interface TagToVent {
    tagId: string;
    ventId: string;
}