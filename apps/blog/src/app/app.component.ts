import { Component, OnInit } from '@angular/core';
import { BlogEntry } from '@blog/types';
import { DataService } from './services/data.service';

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  entries: BlogEntry[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.dataService
      .fetch()
      .subscribe((response: BlogEntry[]) => (this.entries = response));
  }

  onSaveEntry(titleInput: HTMLInputElement, bodyInput: HTMLInputElement): void {
    const entry = {
      title: titleInput.value,
      body: bodyInput.value,
    };

    this.dataService.save(entry).subscribe(() => {
      this.fetch();
      titleInput.value = '';
      bodyInput.value = '';
    });
  }

  onDeleteEntry(index: number): void {
    this.dataService.delete(index).subscribe(() => this.fetch());
  }
}
