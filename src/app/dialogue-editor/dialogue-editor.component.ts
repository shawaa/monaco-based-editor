import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogue-editor',
  templateUrl: './dialogue-editor.component.html',
  styleUrls: ['./dialogue-editor.component.css']
})
export class DialogueEditorComponent implements OnInit {

  public trigger = {
    schema: 'trigger',
    default: '{\n\t"type": "intent"\n}'
  };

  private nodes = {
    schema: 'nodes',
    default: '[\n\t{\n\t\t"type":"message"\n\t}\n]'
  };

  constructor() { }

  ngOnInit() {
  }

}
