declare module 'mermaid' {
  export interface MermaidAPI {
    initialize(config?: any): void;
    render(id: string, text: string): Promise<{ svg: string }>;
  }
  
  const mermaid: MermaidAPI;
  export default mermaid;
}