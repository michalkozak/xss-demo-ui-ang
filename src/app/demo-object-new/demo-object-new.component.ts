import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DemoObject } from '../demo-objects.interface';
import { DemoObjectsService } from '../demo-objects.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-demo-object-new',
  templateUrl: './demo-object-new.component.html',
  styleUrls: ['./demo-object-new.component.css']
})
export class DemoObjectNewComponent implements OnInit {
  newDemoObject: DemoObject = new DemoObjectForm();
  errorMessage: string | undefined;

  @ViewChild("demoObjectForm")
  demoObjectForm!: NgForm;
  isSubmitted: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private demoObjectsService: DemoObjectsService
  ) { }

  ngOnInit(): void {
  }

  addDemoObject(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.demoObjectsService.addDemoObject(this.newDemoObject).subscribe(
          {
            next: (data: DemoObject) => {
              console.log(data)
              this.router.navigate(['/demo-objects']);
            },
            error: (error: Error) => {
              this.errorMessage = error.message;
            }
          });
    }
  }

}

export class DemoObjectForm {
  id: number = -1;
  name: string = "";
  description: string = "";
}
