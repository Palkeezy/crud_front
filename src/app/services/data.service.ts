import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {API_Response} from '../interfaces/API_Response';
import {newLineWithIndentation} from 'tslint/lib/utils';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<API_Response> {
    return this.http.get<API_Response>('http://localhost:3000/items');
  }

  addItem(newItem) {
    return this.http.post('http://localhost:3000/item', newItem);
  }

  deleteItem(id) {
    return this.http.delete('http://localhost:3000/item/' + id);
  }

  updateItem(item) {
    return this.http.put('http://localhost:3000/item/' + item._id, item);

  }

}
