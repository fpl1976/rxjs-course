import { Component, OnInit } from '@angular/core';
import { of, concat } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);

    const result$ = concat(source1$, source2$);

    result$.subscribe(
      res => console.log(res)
    );

  }


}
