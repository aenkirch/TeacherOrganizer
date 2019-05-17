import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class AppService {

  protected restItemsUrl : string = 'http://localhost:5002/';

  constructor(private http: HttpClient) { }

  //  GET requests

  getAll(endUrl) {
    return this.http
      .get<any[]>(this.restItemsUrl + endUrl)
      .pipe(map(data => data));
  }

  getGroupes(endUrl, selectedFormationId) {
    return this.http
      .get<any[]>(this.restItemsUrl + endUrl + "/" + selectedFormationId)
      .pipe(map(data => data));
  }

  getPeriodes(endUrl, selectedFormationId) {
    return this.http
      .get<any[]>(this.restItemsUrl + endUrl + "/" + selectedFormationId)
      .pipe(map(data => data));
  }

  getNbH(endUrl, idMatiere) {
    return this.http
      .get<any[]>(this.restItemsUrl + endUrl + "/" + idMatiere)
      .pipe(map(data => data));
  }

  getModules(endUrl, selectedFormationId) {
    return this.http
      .get<any[]>(this.restItemsUrl + endUrl + "/" + selectedFormationId)
      .pipe(map(data => data));
  }

  getMatieres(endUrl, selectedFormationId) {
    return this.http
      .get<any[]>(this.restItemsUrl + endUrl + "/" + selectedFormationId)
      .pipe(map(data => data));
  }

  //  PUT requests (replacing a resource)

  modifyNbH(endUrl, newIdMat, newIdPeriod, oldIdMat, oldIdPeriod) {
    return this.http
      .put<any[]>(this.restItemsUrl + endUrl, {new_id_mat: newIdMat, new_id_period: newIdPeriod, old_id_mat: oldIdMat, old_id_period: oldIdPeriod}, httpOptions)
      .pipe(map(data => data));
  }

  modifyNbHbyNbH(endUrl, newIdMat, newIdPeriod, nbH) {
    return this.http
      .put<any[]>(this.restItemsUrl + endUrl, {new_id_mat: newIdMat, new_id_period: newIdPeriod, nbH}, httpOptions)
      .pipe(map(data => data));
  }

  //  PATCH requests (modifying an existing resource)

  editNbHvalue(endUrl, nbH, idMat, idPeriod) {
    return this.http
      .patch<any[]>(this.restItemsUrl + endUrl, {id_mat: idMat, id_period: idPeriod, nbH}, httpOptions)
      .pipe(map(data => data));
  }

  //  POST requests (creating a resource)

  createNbHvalue(endUrl, nbH, idMat, idPeriod) {
    return this.http
      .post<any[]>(this.restItemsUrl + endUrl, {id_mat: idMat, id_period: idPeriod, nbH}, httpOptions)
      .pipe(map(data => data));
  }

  //  DELETE requests

  deleteNbHvalue(endUrl, idMat, idPeriod) {
    return this.http
      .delete<any[]>(this.restItemsUrl + endUrl + "/" + idMat + "/" + idPeriod)
      .pipe(map(data => data));
  }

}
