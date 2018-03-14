# Change Detection Tree

- NgZone + ChangeDetection.Default: <br>
https://stackblitz.com/github/Angular-RU/change-detection-tree

![](https://habrastorage.org/webt/ic/3q/xw/ic3qxwhcqi52ismnykxnoi1rhoq.gif)

- ChangeDetection.OnPush + Async pipe (without NgZone): <br>
https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/without-zone

![](https://lh6.googleusercontent.com/1cvhUMAYNPpVsF6OqN5CBr0qeWVXRdCM5_fp4co4Pr2VDPCUqYlkhKPMMqPbv4QkqAwG5FMGHxSYr-nWA4ZZRQICOD-q5XE9bEVKyNn8mopiS4TM8Ak-A5jTX0xU6h9Snl6r7zNjR-E)

- NgZone + ChangeDetection.OnPush (random generate tree)
https://stackblitz.com/github/Angular-RU/change-detection-tree/tree/generate-random-tree

![](https://habrastorage.org/webt/kb/ke/99/kbke999qbcmzik5pbjcp4pp3jfo.gif)

#### Basic tree

```html
<tree>

  <child></child>
  <child></child>

  <child>
    <child></child>
    <child>
      <child></child>
      <child></child>
      <child></child>
    </child>
  </child>

</tree>
```

![](https://habrastorage.org/webt/dl/a2/iu/dla2ius47ynsh4xwu4a3mmu8_rw.png)

#### Advanced tree

```html
<tree>

  <div>Root Component</div>

  <child>
    <div class="form-group">
      <label>First Name</label>
      <input type="text"
             class="form-control">
    </div>
  </child>

  <child>
    <div class="form-group">
      <label>Last Name</label>
      <input type="text"
             class="form-control">
    </div>
  </child>

  <child>

    <div class="form-group">
      <label>Email</label>
      <input type="email"
             class="form-control">
    </div>

    <child>
      <div class="form-group">
        <label>Password</label>
        <input type="password"
               class="form-control">
      </div>
    </child>

    <child>

      <div class="form-group">
        <label>Language</label>
        <select class="form-control">
          <option value="">Please select a language</option>
        </select>
      </div>

      <child></child>
      <child></child>

      <child>
        <div class="form-group">
          <label>Send message</label>
          <button>Send</button>
        </div>
      </child>

    </child>
  </child>

</tree>

```

![](https://habrastorage.org/webt/zg/om/oj/zgomoj29m-xofxwh6uegshsamzk.png)
