interface DatabasePort {
  connect(): void;
  disconnect(): void;
  query(query: string): any;
}
