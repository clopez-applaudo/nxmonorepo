import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogEntry } from '@blog/types';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  fetch() {
    return this.http.get<BlogEntry[]>('/api/entries');
  }

  save(entry: BlogEntry) {
    return this.http.post('/api/entries', entry);
  }

  delete() {
    return this.http.delete(`/api/entries/`);
  }
}
