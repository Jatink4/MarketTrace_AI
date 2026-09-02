import fs from 'fs';
import path from 'path';

export class DataIngestionService {
  /**
   * Parse CSV, JSON, or TXT raw content into structured row records
   */
  static parseRawContent(filename, content) {
    const ext = path.extname(filename).toLowerCase();
    const cleanContent = typeof content === 'string' ? content.trim() : '';

    if (ext === '.json') {
      try {
        const parsed = JSON.parse(cleanContent);
        const rows = Array.isArray(parsed) ? parsed : (parsed.data || [parsed]);
        return {
          format: 'JSON',
          filename,
          rowCount: rows.length,
          columns: rows.length > 0 ? Object.keys(rows[0]) : [],
          rows
        };
      } catch (e) {
        throw new Error(`JSON parsing failed: ${e.message}`);
      }
    }

    if (ext === '.txt') {
      // Line or paragraph based text documents for unstructured RAG
      const paragraphs = cleanContent.split(/\n\s*\n/).map((p, i) => ({
        document_id: `DOC-${i + 1}`,
        text: p.trim(),
        date: new Date().toISOString().split('T')[0]
      })).filter(d => d.text.length > 0);

      return {
        format: 'TXT',
        filename,
        rowCount: paragraphs.length,
        columns: ['document_id', 'text', 'date'],
        rows: paragraphs
      };
    }

    // Default to CSV
    return this.parseCSV(cleanContent, filename);
  }

  static parseCSV(csvText, filename = 'data.csv') {
    const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) {
      return { format: 'CSV', filename, rowCount: 0, columns: [], rows: [] };
    }

    const headers = this.parseCSVLine(lines[0]);
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length === headers.length) {
        const row = {};
        headers.forEach((h, idx) => {
          let val = values[idx];
          // auto-convert numeric
          if (val !== '' && !isNaN(val)) {
            val = Number(val);
          }
          row[h] = val;
        });
        rows.push(row);
      }
    }

    return {
      format: 'CSV',
      filename,
      rowCount: rows.length,
      columns: headers,
      rows
    };
  }

  static parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  }
}
