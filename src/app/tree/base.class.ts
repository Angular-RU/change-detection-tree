import {Color} from "../utils/Color";
import {Alphabet} from "../utils/Aplhabet";
import {Injector, NgZone} from "@angular/core";

export abstract class TreeNode {
  public componentId: string;
  public color: string;
  public finishedTime: string = null;
  private ngZone: NgZone;
  private isOpen: boolean = false;

  constructor(context: Injector) {
    this.ngZone = context.get(NgZone);
    this.color = this.componentId ? Color.generateRGB('black') : Color.generateRGB();
    this.componentId = this.componentId || Alphabet.getUniqueId();
  }

  public async checkLifeCycle(method, timeRendering) {
    const isInfoLogs = ["ngOnChanges", "ngOnInit", "ngDoCheck"].includes(method);
    const level = isInfoLogs ? 'log' : 'debug';
    const message = [
      `%c[${this.componentId}]: lifecycle(${method}) ${!timeRendering ? '' : 'Finished time: ' + timeRendering}`,
      `color: ${this.color}; font-weight: normal`
    ];

    if ( (method === "ngDoCheck") && !this.isOpen ) {
      console.group.apply(console, message);
      this.isOpen = true;
    } else {
      console[level].apply(console, message);
    }

    if (method === "ngAfterViewChecked") {
      console.groupEnd();
      // TODO: bug, this.finishedTime = timeRendering;
      this.isOpen = false;
    }

  }
}

