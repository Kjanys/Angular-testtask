import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  thisopenMenu = false;

  openMenu() {
    this.thisopenMenu = true;
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
