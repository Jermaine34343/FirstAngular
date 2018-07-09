import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}

//Always import the Component symbol from the Angular core library and annotate the component class with @Component
//@Component is a decorator function that specifies the Angular metadata for the component
//CLI generated three metadata properties:
  //1. selector - the component's CSS element selector
  //2.templateUrl - the location of the component's template file.
  //3. styleUrl - the location of the component's private CSS styles
//The CSS element selector, 'app-heores' matches the name of the HTML element that identifies the component within a parent component's template
//The NgOnInit is a lifecycle hook Angular calls ngOnInit shortly after creating a component.  It's a good place to put initialization logic.
//Always export the component class so you can import it elsewhere...like in thee AppModule.
//You define private styles either inline in the @Component.styles array or as stylesheet file(s) identified in the @Component.styleUrls array.
//When the CLI generated the HeroesComponent, it created an empty heroes.component.css stylesheet for the HeroesComponent and pointed to it in @Component.styleUrls.
//onSelect() method assigns the clicked hero from the template to the component's selectedHero
