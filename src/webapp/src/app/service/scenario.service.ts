import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Scenario} from "../entities/scenario";


@Injectable()
export class ScenarioService {
  private scenarioUrl = 'rest/scenario';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getScenario(id: number): Promise<Scenario> {
    const url = `${this.scenarioUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Scenario)
      .catch(this.handleError);
  }

  getScenarios(): Promise<Scenario[]> {
    return this.http.get(this.scenarioUrl)
      .toPromise()
      .then(response => response.json() as Scenario[])
      .catch(this.handleError);
  }

  create(name: string): Promise<Scenario> {
    return this.http
      .post(this.scenarioUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Scenario)
      .catch(this.handleError);
  }

  update(scenario: Scenario): Promise<Scenario> {
    const url = `${this.scenarioUrl}/${scenario.id}`;
    return this.http
      .put(url, JSON.stringify(scenario), {headers: this.headers})
      .toPromise()
      .then(() => scenario)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
