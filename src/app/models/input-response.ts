import { LocationCoordinate2D } from "./LocationCoordinate2D";

export interface InputResponse {
    id: number;
    MissionCode:String;
    locationinitLat:number;
    locationinitLng:number;
    date: Date;
    altitude:string;
    type:string;
    heading:string;
    finishing:string;
    numberWaypoints:number;
    radius:number;
    speed:number;
    waypointsList:LocationCoordinate2D[];
    duration:string;
    locationFinishLat:number;
    locationFinishLng:number;
    finishdate: string;
    coordinates: LocationCoordinate2D[];
}