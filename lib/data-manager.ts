import * as fs from 'fs/promises';
import path from 'path';

// interface PersonalInfo {
//   content: string;
//   embedding: number[];
// }

export class PersonalDataManager {
  private dataPath: string;
  private embeddings: Map<string, number[]>;

  constructor() {
    // Using path.join to create cross-platform compatible path
    this.dataPath = path.join(process.cwd(), 'data', 'personal_info.txt');
    console.log('Resolved path:', this.dataPath);
    this.embeddings = new Map();
  }

  async loadData(): Promise<string[]> {
    try {
      // Check if file exists
      try {
        await fs.access(this.dataPath);
      } catch {
        console.error('Personal info file not found at:', this.dataPath);
        throw new Error('Personal information file not found');
      }

      const rawData = await fs.readFile(this.dataPath, 'utf-8');
      
      // Split data into chunks
      const chunks = this.splitIntoChunks(rawData);
      
      return chunks;
    } catch (error) {
      console.error('Error loading personal data:', error);
      throw error;
    }
  }

  private splitIntoChunks(text: string, maxChunkSize: number = 1000): string[] {
    const chunks: string[] = [];
    const paragraphs = text.split('\n\n');
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length <= maxChunkSize) {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        currentChunk = paragraph;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  async findRelevantContext(): Promise<string> {
    const chunks = await this.loadData();
    return chunks.join('\n\n');
  }

  // Helper method to get data path
  getDataPath(): string {
    return this.dataPath;
  }
}