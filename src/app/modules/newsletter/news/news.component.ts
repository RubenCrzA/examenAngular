import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewslaterServiceService } from '../services/newslater-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public articles: any[] = [];
  constructor(
    private newslaterServiceService: NewslaterServiceService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const request = await fetch('https://ipinfo.io/json?token=59c6d07e5e9aa9');
    const json = await request.json();
    let lgNav = window.navigator.language;
    let lg = lgNav.substring(0, 2);
    console.log(json);
    console.log(lg);
    this.newslaterServiceService
      .obtenerNoticias(json.country.toLowerCase(), lg)
      .subscribe((response) => {
        console.log(response.articles);
        this.articles = response.articles;
      });
  }

  returnLogin() {
    this.router.navigate(['/']);
  }
}
