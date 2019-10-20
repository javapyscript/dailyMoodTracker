import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiBlockComponent } from './emoji-block.component';

describe('EmojiBlockComponent', () => {
  let component: EmojiBlockComponent;
  let fixture: ComponentFixture<EmojiBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
