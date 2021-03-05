import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  // @Output() public searchString = new EventEmitter<string>();
  // @Output() public isUserSearched = new EventEmitter<boolean>();

  public searchTerm$ = new Subject<string>();

  constructor(private appService: AppService,private router:Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  searchProduct(event) {
    const userSearchedFor = event.target.value;
    this.appService.filterProductsBySearchString('userInput', userSearchedFor);
  }

}
