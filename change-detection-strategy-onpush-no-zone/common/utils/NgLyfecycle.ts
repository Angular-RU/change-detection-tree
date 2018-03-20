import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

export abstract class NgLifecycle implements OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngOnInit(): void {
  }

  public ngDoCheck(): void {
  }

  public ngAfterContentInit(): void {
  }

  public ngAfterContentChecked(): void {
  }

  public ngAfterViewInit(): void {
  }

  public ngAfterViewChecked(): void {
  }

  public ngOnDestroy(): void {
  }
}

