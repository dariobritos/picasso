import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Calculation} from "../entities/calculation";


@Injectable()
export class CalculationService {
  private calculationUrl = 'calculation';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getCalculation(id: number): Promise<Calculation> {
    const url = `${this.calculationUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Calculation)
      .catch(this.handleError);
  }

  getCalculations(): Promise<Calculation[]> {
    return this.http.get(this.calculationUrl)
      .toPromise()
      .then(response => response.json() as Calculation[])
      .catch(this.handleError);
  }

  create(name: string): Promise<Calculation> {
    return this.http
      .post(this.calculationUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Calculation)
      .catch(this.handleError);
  }

  update(hero: Calculation): Promise<Calculation> {
    const url = `${this.calculationUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
