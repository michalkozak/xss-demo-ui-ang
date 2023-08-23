import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DemoObject, FileObject, UploadResponse } from '../demo-objects.interface';
import { DemoObjectsService } from '../demo-objects.service';

import { computeHash } from "./hash.utils";

@Component({
  selector: 'app-demo-object-upload',
  templateUrl: './demo-object-upload.component.html',
  styleUrls: ['./demo-object-upload.component.css']
})
export class DemoObjectUploadComponent implements OnInit {
  file?: File;
  errorMessage: string | undefined;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private demoObjectsService: DemoObjectsService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file) {
      this.doUpload(this.file);
      this.file = undefined;
    }
  }

  doUpload(file: File) {

    computeHash(file).subscribe(
        (hash: string) => {
          let fileObject = this.createFileObject(file, hash);
          console.log(fileObject);

          this.demoObjectsService.initUpload(fileObject).subscribe(
              {
                next: (data: UploadResponse) => {
                  this.uploadFile(data.id, file);
                },
                error: (error: Error) => {
                  this.errorMessage = error.message;
                }
              });

        });

  }

  createFileObject(file: File, hash: string) : FileObject {
    return {
      filename: file.name,
      fileLastModifiedOn: new Date(file.lastModified),
      size: file.size,
      mimetype: file.type,
      hash: hash
    };
  }

  uploadFile(uploadId: string, file: File) {
    this.demoObjectsService.uploadDemoObject(uploadId, file).subscribe(
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

