import { Component, OnInit, NgZone } from '@angular/core';

// cách import bị lỗi lúc compile
// import { Jodit } from 'jodit';
declare let Jodit: any;

// cách này bị lỗi: jodit.Jodit.make('#editor');
// import * as jodit from 'jodit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  editor: any;
  output?: string;
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    /**
     * jump function make() vào typeScript tìm Jodit Class để xem function trong đó là biết ngày
     */
    this.editor = Jodit.make('#editor');

    this.editor.events.on('change', function () {
      this.ngZone.run(() => {
        // NgZone là singlton chứa context queue run trên UI-thread
        // nếu run lệnh này trên thread khác thì UI sẽ ko update cho tới khi
        // có 1 event nào đó trên UI-thread để kích hoạt angular update UI (touch, mouse move, click)
        this.preview();
      });
      // this.output = this.editor.value;
      console.log(this.editor.value);
    });
  }

  preview() {
    this.output = this.editor.value;
  }

  setContent() {
    // this.editor.setEditorValue('<h1 style="color:red;">Hello world</h1>');
    this.editor.value = '<h1 style="color:red;">Hello world</h1>';
  }
}
