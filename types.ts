
export enum ProtocolStatus {
  PENDING = 'PENDING',
  SIGNED = 'SIGNED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum ProtocolType {
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL'
}

export interface Protocol {
  id: string;
  code: string;
  title: string;
  description: string;
  sender: string;
  recipient: string;
  createdAt: string;
  status: ProtocolStatus;
  type: ProtocolType;
  category: string;
  attachments?: string[];
}

export interface DashboardStats {
  total: number;
  pending: number;
  signed: number;
  delivered: number;
}
