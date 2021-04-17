import { Injectable } from '@nestjs/common';
import { BlogEntry } from '@blog/types';

@Injectable()
export class AppService {
  entries: BlogEntry[] = [
    {
      url: 'https://www.youtube.com/watch?v=MIeOEqGZopw',
      times: 1,
    },
  ];

  getData(): BlogEntry[] {
    return this.entries;
  }

  create(entry: BlogEntry) {
    const { url, times } = entry;
    const newEntry = {
      url,
      times,
    };

    this.entries = [...this.entries, newEntry];
  }

  delete() {
    this.entries = [];
  }
}
