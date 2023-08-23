import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DemoObject, DemoObjects } from '../demo-objects.interface';
import { DemoObjectsService } from '../demo-objects.service';

@Component({
  selector: 'app-demo-object-list',
  templateUrl: './demo-object-list.component.html',
  styleUrls: ['./demo-object-list.component.css']
})
export class DemoObjectListComponent implements OnInit {
  demoObjects: DemoObject[] = [];
  hits: number = 0;

  constructor(
      private route: ActivatedRoute,
      private demoObjectsService: DemoObjectsService
  ) { }

  ngOnInit(): void {
    this.demoObjectsService.getDemoObjects().subscribe((data : DemoObjects) => {
      this.demoObjects = data.demos;
      this.hits = data.hits;
    });
  }

}
