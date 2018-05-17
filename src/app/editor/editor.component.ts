import { Component, OnInit } from '@angular/core';
import { NgxEditorModel, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  
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
    }
  }

  private lineHeight: number;

  private container: HTMLElement;

  private containerHeight: number;

  private editor: any;  

  constructor() {
  }

  setHeightOfContainer() {
    this.containerHeight = Math.max((this.editor.viewModel.lines.lines.length * this.lineHeight) + this.lineHeight, this.lineHeight * 10.5);
    this.editor.layout({
      width: this.container.offsetWidth,
      height: this.containerHeight
    });
  } 

  onMonacoInit(editor) {
    this.lineHeight = editor.viewModel.configuration.editor.lineHeight;
    this.container = editor.domElement;
    this.editor = editor;
  }

  ngOnInit() {    
    this.setHeightOfContainer()
  }
}
