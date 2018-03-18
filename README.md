# Change Detection Tree

> This project shows you how the component tree in Angular is updated. 
> The time shown on the component nodes in the tree is the interval 
> between ngDoCheck and ngAfterViewChecked.

```bash
$ git clone https://github.com/Angular-RU/change-detection-tree cd-tree && cd cd-tree
$ npm install # install all dependencies
$ ng serve # worked with jit or aot
```

StackBlitz: 

- NgZone + ChangeDetection.Default (static tree + projection): <br>
code sample: https://stackblitz.com/github/Angular-RU/change-detection-tree <br>
online view: 

![](https://habrastorage.org/webt/dl/w4/u-/dlw4u-sfjgf1i2e7b-dpwlefx_k.gif)

```bash
$ ng serve --app 0 --port 4200
```

- NgZone + ChangeDetection.OnPush (random generate tree): <br>
https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/onpush

![](https://habrastorage.org/webt/jq/0t/_l/jq0t_ltli9iyvjtuvumct6awfmk.gif)

- NgZone + ChangeDetection.OnPush (random generate tree): <br>
https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/onpush

![](https://habrastorage.org/webt/jq/0t/_l/jq0t_ltli9iyvjtuvumct6awfmk.gif)

```bash
$ ng serve --app 1 --port 4201
```

#### Detect problem with Zone

> Copy the code and paste it into the console. 
> If your component tree too often calls Application.tick() your application will disappear.

```typescript
let [root] = getAllAngularRootElements();
let appRoot = ng.probe(root);
let [rootComponent] = appRoot.injector.get(ng.coreTokens.ApplicationRef).components;
let ChangeDetectorRef = rootComponent.changeDetectorRef.constructor.prototype;
ChangeDetectorRef.constructor.prototype.detectChanges = (function () {
    let oldDC = ChangeDetectorRef.constructor.prototype.detectChanges;
    let map = new WeakMap();
    
    return function () {
        Zone.root.run(() => showChangeDetection(this));
        return oldDC.apply(this, arguments);
    }

    function showChangeDetection (changeDetector) {
        let view = changeDetector._view;
        modifyNodeOpacity(view, fade);
        modifyNodeOpacity(view, (node) => {
            let timeout = map.get(node.renderElement);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => show(node), 1000);
            map.set(node.renderElement, timeout);
        });
    }

    function modifyNodeOpacity (view, modifier) {
        view.nodes.forEach(node => {
            if (node && node.renderElement && node.renderElement.style) {
                modifier(node);
            }
        });
    }

    function fade (node) {
        let { style } = node.renderElement;
        let opacity = parseFloat(style.opacity) || 1;
        let newOpacity = opacity - 0.01;
        style.display = 'block';
        style.opacity = newOpacity > 0 ? newOpacity : 0;
    }

    function show (node) {
        let { style } = node.renderElement;
        style.display = 'block';
        style.opacity = 1;
    }
})();
```

