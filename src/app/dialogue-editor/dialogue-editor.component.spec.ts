import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueEditorComponent } from './dialogue-editor.component';

describe('DialogueEditorComponent', () => {
  let component: DialogueEditorComponent;
  let fixture: ComponentFixture<DialogueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
