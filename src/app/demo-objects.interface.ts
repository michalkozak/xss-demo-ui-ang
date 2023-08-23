export interface DemoObject {
  id: number;
  name: string;
  description: string;
}

export interface DemoObjects {
  demos: DemoObject[];
  hits: number;
}

export interface FileObject {
  filename: string;
  fileLastModifiedOn: Date;
  size: number;
  mimetype: string;
  hash: string;
}

export interface UploadResponse {
  id: string;
}
