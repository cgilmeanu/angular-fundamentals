import { Passenger } from "./models/passenger.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';

const PASSENGER_API: string = 'api/passengers';

@Injectable()
export class PassengerDashboardService {
    constructor(private httpClient: HttpClient) {
        
    }

    getPassengers(): Observable<Passenger[]> {
        return  this.httpClient
            .get(PASSENGER_API)
            .pipe(
                map(response => response as Passenger[]),
                catchError((error: any) => throwError(error.json()))
            );
    }

    getPassenger(passengerId: number): Observable<Passenger> {
        return  this.httpClient
            .get(`${PASSENGER_API}/${passengerId}`)
            .pipe(
                map(response => response as Passenger),
                catchError((error: any) => throwError(error.json()))
            );
    }

    updatePassenger(passenger: Passenger): Observable<Passenger> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = { headers };

        return  this.httpClient
            .put(`${PASSENGER_API}/${passenger.id}`, passenger , options )
            .pipe(
                map(response => response as Passenger),
                catchError((error: any) => throwError(error.json()))
            );
    }

    removePassenger(passenger: Passenger): Observable<Passenger> {
        return  this.httpClient
            .delete(`${PASSENGER_API}/${passenger.id}`)
            .pipe(
                map(response => response as Passenger),
                catchError((error: any) => throwError(error.json()))
            );
    }
}