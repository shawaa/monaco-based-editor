import { Component, OnInit } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private code: string;

  model: NgxEditorModel = {
    value: this.code,
    language: 'json'
  };

  constructor() {
    this.code = "ljkasd";
   }

  ngOnInit() {
  }
}
