import {Timer} from "./Timer";

interface LifecycleOptions {
  defaultName: boolean;
}

export function Lifecycle(option: Partial<LifecycleOptions> = {}): ClassDecorator {

  return function (constructor: any) {

    const self = constructor.prototype;
    const originalName = constructor.name;
    self.componentId = option.defaultName ? originalName : null;

    [
      "ngOnChanges",
      "ngOnInit",
      "ngDoCheck",
      "ngAfterContentInit",
      "ngAfterContentChecked",
      "ngAfterViewInit",
      "ngAfterViewChecked",
      "ngOnDestroy"
    ].forEach((method) => {
      const origin = constructor.prototype[method];
      constructor.prototype[method] = async function (...args) {

        let timeRenderingResult = null;

        if (method === "ngDoCheck") {
          self.timeExecute = new Timer();
        }

        if (method === "ngAfterViewChecked") {
          timeRenderingResult = self.timeExecute.stop();
        }

        origin && origin.apply(this, args);
        self.checkLifeCycle && self.checkLifeCycle.apply(this, [method, timeRenderingResult]);

      }
    });
  }

}



