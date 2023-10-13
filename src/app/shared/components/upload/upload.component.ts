import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  private _resetSubscription!: Subscription;

  @Input() shouldReset$!: Subject<boolean>;

  selectedFiles: File[] = [];

  /**
   * Selected file event emitter
   */
  @Output() selectedFilesChange = new EventEmitter<File[]>();

  ngOnInit(): void {
      this._resetSubscription = this.shouldReset$.subscribe(reset => {
        if (!reset) return;

        this.selectedFiles = [];
        this.emitchanges();
      })
  }

  ngOnDestroy(): void {
      this._resetSubscription.unsubscribe();
  }

  /**
   * Adds selected file(s) to selected file list
   * @param event File upload event
   */
  onFileSelected(event: any) {
    if (!event.target.files) return;
    
    this.selectedFiles = [...event.target.files, ...this.selectedFiles];
  
    this.emitchanges();
  }

  /**
   * Remvoes the first occurrence of a file by name
   * @param name Name of file
   */
  removeFile(name: string) {
    const fileIndex = this.selectedFiles
      .findIndex(file => file.name === name);
  
    this.selectedFiles.splice(fileIndex, 1);
    this.emitchanges();
  }

  /**
   * Emits selected file changes
   */
  private emitchanges(){ 
    this.selectedFilesChange.emit(this.selectedFiles);
  }
}
