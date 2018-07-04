import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { filter, concatMap, mergeMap, exhaustMap } from 'rxjs/operators';
import { save } from '../util';
import { fromEvent } from 'rxjs';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course: Course;

    @ViewChild('saveButton') saveButton: ElementRef;
    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

    }

    ngOnInit() {

        // concat observables strategy
        // this.form.valueChanges
        //     .pipe(
        //         filter(() => this.form.valid),
        //         concatMap(changes => save(this.course.id, 'courses', changes))
        //     ).subscribe();

        // merge observables strategy
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                mergeMap(changes => save(this.course.id, 'courses', changes))
            ).subscribe();

    }



    ngAfterViewInit() {
        fromEvent(this.saveButton.nativeElement, 'click')
            .pipe(
                // concatMap(() => save(this.course.id, 'courses', this.form.value))
                // Ignores all clicks emmitted while the save observable is running
                exhaustMap(() => save(this.course.id, 'courses', this.form.value))
            )
            .subscribe();

    }



    close() {
        this.dialogRef.close();
    }

}
