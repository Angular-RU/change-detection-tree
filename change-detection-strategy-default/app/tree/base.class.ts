import {Color} from '../utils/Color';
import {Alphabet} from '../utils/Aplhabet';
import {ChangeDetectorRef, ElementRef, Injector, NgZone, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {NgLifecycle} from '../utils/NgLyfecycle';

interface TreeTimers {
  start: number;
  finished: number;
}

export abstract class TreeNode extends NgLifecycle implements OnChanges {
  @ViewChild('contentNode') public contentNode: ElementRef;
  public componentId: string;
  public componentIndex: number;
  public color: string;
  public changes: any;
  protected element: ElementRef;
  protected renderer: Renderer2;
  protected zone: NgZone;
  protected cd: ChangeDetectorRef;
  private startedTime: number;
  private timers: TreeTimers = {start: null, finished: null};
  private isOpenGroup: boolean = null;

  constructor(context: Injector) {
    super();
    this.element = context.get(ElementRef);
    this.renderer = context.get(Renderer2);
    this.zone = context.get(NgZone);
    this.cd = context.get(ChangeDetectorRef);
    this.color = this.componentId ? Color.generateRGB('black') : Color.generateRGB();
    this.componentIndex = Alphabet.getUniqueIndex();
    this.componentId = this.componentId || Alphabet.getUniqueId();
  }

  public checkLifeCycle(method, timeRendering: string) {
    const isInfoLogs = ['ngOnChanges', 'ngOnInit', 'ngDoCheck'].includes(method);
    const level = isInfoLogs ? 'log' : 'debug';
    const message = [
      `%c[${this.componentId}]: lifecycle(${method}) ${!timeRendering ? '' : 'Finished time: ' + timeRendering}`,
      `color: ${this.color}; font-weight: normal`
    ];

    if ((method === 'ngDoCheck') && !this.isOpenGroup) {
      this.startedTime = this.componentIndex * 100;
      this.zone.runOutsideAngular(() => {
        this.timers.start = window.setTimeout(() => {
          if (this.contentNode) {
            this.contentNode.nativeElement.style['transform'] = 'scale(1.1)';
            this.contentNode.nativeElement.style['background-color'] = '#000';
          }
        }, this.startedTime);
      });

      console.group.apply(console, message);
      this.isOpenGroup = true;
    } else {
      console[level].apply(console, message);
    }

    if (method === 'ngAfterViewChecked') {
      console.groupEnd();

      this.zone.runOutsideAngular(() => {
        this.timers.finished = window.setTimeout(() => {
          if (this.contentNode) {
            this.contentNode.nativeElement.style['transform'] = null;
            this.contentNode.nativeElement.style['background-color'] = this.color;
            this.contentNode.nativeElement.setAttribute('data-finished-time', `(${timeRendering}ms)`);
          }
        }, timeRendering + this.startedTime + 1000);
      });

      this.isOpenGroup = false;
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.changes = changes;
  }

}

