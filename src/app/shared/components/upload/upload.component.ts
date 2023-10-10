import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  selectedFiles: File[] = [];

  /**
   * Adds selected file(s) to selected file list
   * @param event File upload event
   */
  onFileSelected(event: any) {
    if (!event.target.files) return;
    
    this.selectedFiles = [...event.target.files, ...this.selectedFiles];
  }

  /**
   * Remvoes the first occurrence of a file by name
   * @param name Name of file
   */
  removeFile(name: string) {
    const fileIndex = this.selectedFiles
      .findIndex(file => file.name === name);
  
    this.selectedFiles.splice(fileIndex, 1);
  }
}
