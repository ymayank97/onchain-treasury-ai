// Core data types for the Autonomous Transaction Banking Platform

export type EntityType = 'DEPARTMENT' | 'VENDOR' | 'SYSTEM';

export interface Balance {
    entity_name: string;
    current_balance: number;
    last_updated: string;
    entity_type: 'DEPARTMENT' | 'VENDOR' | 'SYSTEM';
    branch_code: string;
    country: string;
}

export interface Transaction {
    id: string;
    timestamp: string;
    from: string;
    to: string;
    amount: number;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    reason: string;
    compliance_status: 'APPROVED' | 'REJECTED' | 'PENDING';
    ai_recommended: boolean;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    branch_code: string;
}

export interface AIRecommendation {
    recommendation: 'TRANSFER' | 'HOLD';
    from: string;
    to: string;
    amount: number;
    reason: string;
}

export interface ComplianceCheck {
    status: 'APPROVED' | 'REJECTED';
    reason: string;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface DepartmentLimits {
    [key: string]: number;
}

export interface VendorList {
    approved: string[];
    blacklisted: string[];
}

export interface DepartmentLimit {
    department: string;
    limit: number;
    branch_code: string;
}
