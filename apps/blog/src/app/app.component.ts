import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogEntry } from '@blog/types';
import { DataService } from './services/data.service';

@Component({
  selector: 'blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  entries: BlogEntry[];

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.dataService.fetch().subscribe(
      (response: BlogEntry[]) =>
        (this.entries = response.map((entry) => ({
          url: this.sanitizer.bypassSecurityTrustResourceUrl(
            entry.url.replace('watch?v=', 'embed/')
          ),
          times: Array.isArray(entry.times)
            ? entry.times
            : Array(entry.times).fill(1),
        })))
    );
  }

  onSaveEntry(urlInput: HTMLInputElement, timesInput: HTMLInputElement): void {
    const entry = {
      url: urlInput.value,
      times: Number(timesInput.value),
    };

    this.dataService.save(entry).subscribe(() => {
      this.fetch();
      urlInput.value = '';
      timesInput.value = '';
    });
  }

  onDeleteEntry(): void {
    this.dataService.delete().subscribe(() => this.fetch());
  }
}
