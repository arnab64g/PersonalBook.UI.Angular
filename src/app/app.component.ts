import { Component, Host, OnInit } from '@angular/core';
import { AuthGuard } from './gaurds/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {}
  title = 'PesonalBook A';
}
