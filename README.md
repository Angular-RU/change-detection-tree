# Change Detection Tree

- NgZone + ChangeDetection: https://stackblitz.com/github/Angular-RU/change-detection-tree
- ChangeDetection (without NgZone): [in progress]

![](https://habrastorage.org/webt/p-/zg/tq/p-zgtqwfsrof8smuhaddjr217hu.gif)

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
