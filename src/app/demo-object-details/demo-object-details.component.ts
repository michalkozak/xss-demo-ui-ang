import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DemoObject } from '../demo-objects.interface';
import { DemoObjectsService } from '../demo-objects.service';

@Component({
  selector: 'app-demo-object-details',
  templateUrl: './demo-object-details.component.html',
  styleUrls: ['./demo-object-details.component.css']
})
export class DemoObjectDetailsComponent implements OnInit {
  demoObject: DemoObject | undefined;

  constructor(
      private route: ActivatedRoute,
      private demoObjectsService: DemoObjectsService)
  { }

  ngOnInit() {
    // get the demo object id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const demoObjectId = Number(routeParams.get('demoObjectId'));

    this.demoObjectsService.getDemoObject(demoObjectId).subscribe((data : DemoObject) => {
      this.demoObject = data;
      console.log(this.demoObject)
    });
  }

  showHiddenDescription(demoObject: DemoObject) {
    const hiddenDescriptionLabel = "<strong>hidden description:</strong> ";
    let hiddenDescription = window.document.createElement('p');
    hiddenDescription.innerHTML = hiddenDescriptionLabel + demoObject.description;
    let demoDetailsElement = window.document.querySelector('.demo-details');
    if (demoDetailsElement) {
      demoDetailsElement.appendChild(hiddenDescription);
    }
  }

}
