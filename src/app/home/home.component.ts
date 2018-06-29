import { Component, OnInit } from '@angular/core';

import { map, catchError, filter, shareReplay } from 'rxjs/operators';
import { of, noop, Observable } from 'rxjs';

import { createHttpObservable } from '../util';
import { Course } from '../model/course';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginners$: Observable<Course[]>;
    advanced$: Observable<Course[]>;

    constructor() { }

    ngOnInit() {
        const http$ =
            createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                map(res => [...res.payload]),
                shareReplay(),
                catchError(error => of(error))
            );

        this.beginners$ = courses$
            .pipe(
                map(courses => courses.filter(c => c.category === 'BEGINNER'))
            );

        this.advanced$ = courses$
            .pipe(
                map(courses => courses.filter(c => c.category === 'ADVANCED'))
            );



    }

}
