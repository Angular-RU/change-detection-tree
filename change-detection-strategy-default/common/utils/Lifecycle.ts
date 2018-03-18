import {Timer} from './Timer';

interface LifecycleOptions {
  defaultName: boolean;
  defaultNameValue: string;
}

export function Lifecycle(option: Partial<LifecycleOptions> = {}): ClassDecorator {

  return function (constructor: any) {

    const self = constructor.prototype;
    const componentName = constructor.name;
    self.componentId = option.defaultName ? (option.defaultNameValue || componentName) : null;

    const defaultHooks: string[] = [
      'ngOnChanges',
      'ngOnInit',
      'ngDoCheck',
      'ngAfterContentInit',
      'ngAfterContentChecked',
      'ngAfterViewInit',
      'ngAfterViewChecked',
      'ngOnDestroy',
    ];

    defaultHooks.forEach((method: string) => {
      const original = self[method];
      self[method] = function(...args) {
        let timeRenderingResult =  null;

        if (method === 'ngDoCheck') {
          self.timeExecute = new Timer();
          timeRenderingResult = self.timeExecute.getCurrentTime();
        }

        if (method === 'ngAfterViewChecked') {
          timeRenderingResult = self.timeExecute.getCurrentTime();
        }

        if (original) {
          original.apply(this, args);
          self.checkLifeCycle.apply(this, [method, timeRenderingResult]);
        }

      };
    });

  };

}



