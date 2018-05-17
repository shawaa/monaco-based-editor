import { Component, OnInit } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private code: string;

  constructor() {
    this.code = "ljkasd";
   }

  ngOnInit() {
  }

}
