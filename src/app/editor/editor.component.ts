import { Component, OnInit, Input } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  
  @Input() schema: string;
  @Input() default: string;
  
  private code: string;

  private editorOptions = {
    language: 'json',
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'auto'
    },
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false
    },
    automaticLayout : true
  }

  private configModel: NgxEditorModel 

  private lineHeight: number;

  private container: HTMLElement;

  private containerHeight: number;

  private editor: any;  

  constructor() {
  }

  setHeightOfContainer() {
    this.containerHeight = Math.max((this.editor.viewModel.lines.lines.length * this.lineHeight) + (this.lineHeight * 3), this.lineHeight * 10.5);
    this.editor.layout({
      width: this.container.offsetWidth,
      height: this.containerHeight
    });
  } 

  onMonacoInit(editor) {
    this.lineHeight = editor.viewModel.configuration.editor.lineHeight;
    this.container = editor.domElement;
    this.editor = editor;
    console.log(editor);
  }

  ngOnInit() {  
    this.configModel = {
      language: 'json',
      uri: this.schema + '.json',
      value: this.default
    };
  }
}
