import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  courses$: Observable<any[]> | undefined;

  constructor(private db: AngularFireDatabase) {
   }

  ngOnInit(): void {
    console.log("Test");
    this.courses$ = this.db.list('/course').valueChanges();
    this.courses$.subscribe(courses => console.log(courses));
  }

}
