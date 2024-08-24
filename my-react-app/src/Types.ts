
export interface New {
    id:number;
    title:string;
    content:string;
    image:string | null;
    created_at:string;
}

export interface Comment {
    id:number;
    news_id:number;
    author:string | "anonymous";
    text:string;
}

export interface CommentMutation {
    news_id:number;
    author:string | "anonymous";
    text:string;
}

export interface NewMutation {
    title:string;
    content:string;
    image:string | null;
}