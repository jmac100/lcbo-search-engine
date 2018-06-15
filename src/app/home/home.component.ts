import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  defaultImage: string = 'http://placehold.it/200x100';
  logo: string = 'assets/lcbo_lg.png';
  offset = 100;

  constructor() { }

  ngOnInit() {
  }
}
