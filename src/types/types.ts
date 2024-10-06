export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export enum Department {
    HR = 'HR',
    IT = 'IT',
    FINANCE = 'FINANCE',
    ADMIN = 'ADMIN'
}

export enum OffboardingStatus {
    INITIATED = 'INITIATED',
    IN_PROGRESS = 'IN_PROGRESS',
    PENDING_APPROVALS = 'PENDING_APPROVALS',
    COMPLETED = 'COMPLETED'
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: Department;
}

export interface Task {
    id: number;
    name: string;
    status: TaskStatus;
    description: string | null;
    assignedTo: Employee | null;
    department: Department;
    requiresApproval: boolean;
    approvedBy: Employee | null;
    approvedAt: string | null;
}

export interface OffboardingProcess {
    id: number;
    employee: Employee;
    initiationDate: string;
    lastWorkingDate: string;
    status: OffboardingStatus;
    tasks: Task[];
}

export interface AuditLog {
    id: number;
    action: string;
    performedBy: Employee;
    timestamp: string;
    details: string;
}
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
}
export interface AssetReturn {
    id: number;
    assetName: string;
    assetId: string;
    status: AssetReturnStatus;
    returnedAt: string | null;
    receivedBy: Employee | null;
  }
  
  export enum AssetReturnStatus {
    PENDING = 'PENDING',
    RETURNED = 'RETURNED',
    DAMAGED = 'DAMAGED',
    LOST = 'LOST'
  }
  export interface ExitInterview {
    id: number;
    offboardingProcess: OffboardingProcess;
    scheduledAt: string;
    conductedAt: string | null;
    feedback: string | null;
    conductedBy: Employee | null;
  }  export interface Notification {
    id: number;
    message: string;
    createdAt: string;
    read: boolean;
    employee: Employee;
  }
  