import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HeroService} from "./hero.service";

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit{
  ngOnInit(): void {
    this.getHeroes();
  }

  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;



  constructor(private heroService: HeroService) {

  }


  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }


}

