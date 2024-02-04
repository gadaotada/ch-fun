import { StringToBoolean } from "class-variance-authority/types";

export type User = {
    id : number;
    name : string;
    avatar: string;
}

type DailyStuff = {
    id: number
    challenge_id: number
    daily_feature: string
    locked: 'yes' | 'no'
}

export type ActiveChallenge = {
    id: number;
    name: string;
    feature: DailyStuff;
}

export type DailyUserStats = {
    indexNum: number
    daily_field: number
    finished: 'yes' | 'no'
    note: string
}

export type UserData = {
    userId : number;
    username : string;
    avatar: string;
    finished: string;
    time: string;
    note: string;
}

export type DailyData = {
    day: number
    users: UserData[]
}