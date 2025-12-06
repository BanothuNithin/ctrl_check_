export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export enum BotModel {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-3-pro-preview',
}

export interface Bot {
  id: string;
  name: string;
  description: string;
  model: BotModel;
  systemPrompt: string;
  createdAt: Date;
  active: boolean;
}

export interface NodeData {
  label: string;
  description?: string;
}

export enum NodeType {
  TRIGGER = 'trigger',
  LLM = 'llm',
  HTTP = 'http',
  CONDITION = 'condition',
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: any[];
  status: 'active' | 'draft';
}
