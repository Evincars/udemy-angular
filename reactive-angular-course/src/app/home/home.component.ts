import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // This is how typical React Component looks like
  // - all data are Observables
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private courseService: CoursesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const courses$ = this.courseService
      .getAllCourses()
      .pipe(map((x) => x.sort(sortCoursesBySeqNo)));

    this.beginnerCourses$ = courses$.pipe(
      map((x) => x.filter((o) => o.category == "BEGINNER"))
    );
    this.advancedCourses$ = courses$.pipe(
      map((x) => x.filter((o) => o.category == "ADVANCED"))
    );
  }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }
}
