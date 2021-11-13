import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course, sortCoursesBySeqNo } from "../model/course";
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

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
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
}
