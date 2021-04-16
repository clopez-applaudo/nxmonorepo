import { Injectable } from '@nestjs/common';

export interface BlogEntry {
  title: string;
  body: string;
  timestamp?: Date;
}

@Injectable()
export class AppService {
  entries: BlogEntry[] = [
    {
      title: 'Example Title',
      body: 'Example Blog Entry',
      timestamp: new Date(),
    },
  ];

  getData(): BlogEntry[] {
    return this.entries;
  }

  create(entry: BlogEntry) {
    const { title, body } = entry;
    const newEntry = {
      title,
      body,
      timestamp: new Date(),
    };

    this.entries = [...this.entries, newEntry];
  }

  delete(id: number) {
    this.entries = this.entries.filter((_, idx) => idx !== id);
  }
}
