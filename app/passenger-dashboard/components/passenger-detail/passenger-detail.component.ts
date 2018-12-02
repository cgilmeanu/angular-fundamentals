import { Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
        <div>
            <span class="status" [class.checked-in]="detail.checkedIn"></span>
            <div *ngIf="editing">
                <input type="text" [value]="detail.fullname"
                (input)="onNameChange(name.value)"
                #name>
            </div>
            <div>
            {{detail.fullname}}
            </div>
            <p> {{ passenger | json }}</p>
            <div class="date">
                Check in date: {{ detail.checkInDate ? (detail.checkInDate | date: 'y MMMM d' | uppercase) : 'Not checked in!'}}
            </div>
            <button (click)="toggleEdit()">
             {{ editing ? 'Done' : 'Edit'}}
            </button>
            <button (click)="onRemove()">
                Remove
            </button>
            <button (click)="goToPassenger()">
                View
            </button>
        </div>
    `
})
export class PassengerDetailComponent implements OnChanges {
    
    ngOnChanges(changes) {
        if(changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }

    @Input()
    detail: Passenger;

    @Output()
    remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output()
    edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output()
    view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    editing: boolean = false;

    onNameChange(value) {
        this.detail.fullname = value;
    }

    toggleEdit() {
        if(this.editing) {
            this.edit.emit(this.detail);
        }

        this.editing = !this.editing;
    }

    onRemove(){
         this.remove.emit(this.detail);
    }

    goToPassenger(){
        this.view.emit(this.detail);
    }
}