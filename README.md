# Visual detecting changes in the component tree

> This project shows you how the component tree in Angular is updated. 
> The time shown on the component nodes in the tree is the interval 
> between ngDoCheck and ngAfterViewChecked.

```bash
$ git clone https://github.com/Angular-RU/change-detection-tree cd-tree && cd cd-tree
$ npm install # install all dependencies
$ ng serve # worked with jit or aot
```

StackBlitz: 

✅ **ChangeDetection.Default + NgZone (static tree + projection)**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: https://stackblitz.com/github/Angular-RU/change-detection-tree <br>

<details>
<summary>Learn more</summary>
<div><br>
<img src="https://habrastorage.org/webt/dl/w4/u-/dlw4u-sfjgf1i2e7b-dpwlefx_k.gif">
<pre>
$ ng serve --app 0 --port 4200
</pre>
</details><br>

✅ **ChangeDetection.OnPush + NgZone (random generate tree)**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/onpush

<details>
<summary>Learn more</summary>
<div><br>
<img src="https://habrastorage.org/webt/jq/0t/_l/jq0t_ltli9iyvjtuvumct6awfmk.gif">
<pre>
$ ng serve --app 1 --port 4201
</pre>  
</details><br>

✅ **ChangeDetection.OnPush + Async pipe - without ngZone (random generate tree)**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/onpush-async-without-zone

<details>
<summary>Learn more</summary>
<div><br>
<img src="https://habrastorage.org/webt/jq/0t/_l/jq0t_ltli9iyvjtuvumct6awfmk.gif">
<pre>
$ ng serve --app 2 --port 4202
</pre>
</details><br>

✅ **ChangeDetection.Default + Async pipe + ngZone (random generate tree)**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/async-pipe

<details>
<summary>Learn more</summary>
<div><br>
<img src="https://habrastorage.org/webt/p5/ac/hg/p5achg7jybtcquownvjxohcs5ck.gif" />
<pre>
$ ng serve --app 3 --port 4203
</pre>
</details><br>

❌ **Custom state-management (services)**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: In progress

❌ **NgRx**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: In progress

❌ **MobX**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: In progress

❌ **Web-worker platform**: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: In progress

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

