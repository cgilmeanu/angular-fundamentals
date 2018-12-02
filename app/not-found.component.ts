import { Component } from "@angular/core";


@Component({
    selector: 'app-not-found',
    template: `
    <div>
        Not found, <a routerLink="/">go home</a>!
    </div>
    `
})
export class NotFoundComponent {}