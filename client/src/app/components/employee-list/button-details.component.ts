
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
@Component({
    selector: 'button-detail',
    template: `
  <button class="ml-3" (click)="selectInvoice()">View</button>
    `,
})
export class ButtonDetailComponent implements ViewCell, OnInit {
    @Input() value: string | number;
    @Input() rowData: any;
    constructor(
        private sanitizer: DomSanitizer,
        private changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) { }
    ngOnInit() {
    }
   public selectInvoice(){
        console.log(this.rowData.id)
        // this._router.navigate(['second-component'] , this.rowData.id);
        this._router.navigate(['second-component/' + this.rowData.userId]);

    }

}