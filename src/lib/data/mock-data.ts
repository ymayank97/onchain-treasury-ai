import { Transaction } from '@/lib/types';

import { Balance, DepartmentLimit, DepartmentLimits, VendorList } from '../types/banking';

// Initial balances for departments and vendors
export const initialBalances: Balance[] = [
    {
        entity_name: 'Main Company Account',
        current_balance: 1000000,
        last_updated: new Date().toISOString(),
        entity_type: 'SYSTEM'
    },
    {
        entity_name: 'Marketing US',
        current_balance: 50000,
        entity_type: 'DEPARTMENT',
        branch_code: 'US-NY-001',
        country: 'United States'
    },
    {
        entity_name: 'Marketing UK',
        current_balance: 45000,
        entity_type: 'DEPARTMENT',
        branch_code: 'UK-LON-001',
        country: 'United Kingdom'
    },
    {
        entity_name: 'Finance US',
        current_balance: 80000,
        entity_type: 'DEPARTMENT',
        branch_code: 'US-NY-002',
        country: 'United States'
    },
    {
        entity_name: 'Finance SG',
        current_balance: 75000,
        entity_type: 'DEPARTMENT',
        branch_code: 'SG-SIN-001',
        country: 'Singapore'
    },
    {
        entity_name: 'IT India',
        current_balance: 60000,
        entity_type: 'DEPARTMENT',
        branch_code: 'IN-BLR-001',
        country: 'India'
    },
    {
        entity_name: 'HR UAE',
        current_balance: 40000,
        entity_type: 'DEPARTMENT',
        branch_code: 'AE-DXB-001',
        country: 'United Arab Emirates'
    },
    {
        entity_name: 'Operations UK',
        current_balance: 55000,
        entity_type: 'DEPARTMENT',
        branch_code: 'UK-MAN-001',
        country: 'United Kingdom'
    },
    {
        entity_name: 'External Vendor Ltd.',
        current_balance: 0,
        last_updated: new Date().toISOString(),
        entity_type: 'VENDOR'
    },
    {
        entity_name: 'Trusted Services Co',
        current_balance: 0,
        last_updated: new Date().toISOString(),
        entity_type: 'VENDOR'
    }
];

// Department transfer limits
export const departmentLimits: DepartmentLimit[] = [
    {
        department: 'Marketing US',
        limit: 25000,
        branch_code: 'US-NY-001'
    },
    {
        department: 'Marketing UK',
        limit: 20000,
        branch_code: 'UK-LON-001'
    },
    {
        department: 'Finance US',
        limit: 50000,
        branch_code: 'US-NY-002'
    },
    {
        department: 'Finance SG',
        limit: 45000,
        branch_code: 'SG-SIN-001'
    },
    {
        department: 'IT India',
        limit: 35000,
        branch_code: 'IN-BLR-001'
    },
    {
        department: 'HR UAE',
        limit: 20000,
        branch_code: 'AE-DXB-001'
    },
    {
        department: 'Operations UK',
        limit: 30000,
        branch_code: 'UK-MAN-001'
    }
];

// Approved and blacklisted vendors
export const vendorList: VendorList = {
    approved: [
        'External Vendor Ltd.',
        'Trusted Services Co',
        'Global Solutions Inc',
        'Tech Partners LLC',
        'Digital Services Corp'
    ],
    blacklisted: ['BadVendor Corp', 'Suspicious Inc', 'Unreliable Services', 'Questionable Tech', 'Risky Business Ltd']
};

export const mockTransactions: Transaction[] = [
    {
        id: 'tx_001',
        timestamp: '2024-03-15T10:30:00Z',
        from: 'Marketing US',
        to: 'External Vendor Ltd.',
        amount: 10000,
        status: 'SUCCESS',
        reason: 'Monthly marketing services payment',
        compliance_status: 'APPROVED',
        ai_recommended: true,
        risk_level: 'LOW',
        branch_code: 'US-NY-001'
    },
    {
        id: 'tx_002',
        timestamp: '2024-03-15T09:15:00Z',
        from: 'Finance US',
        to: 'Trusted Services Co',
        amount: 15000,
        status: 'SUCCESS',
        reason: 'Quarterly consulting fees',
        compliance_status: 'APPROVED',
        ai_recommended: false,
        risk_level: 'LOW',
        branch_code: 'US-NY-002'
    },
    {
        id: 'tx_003',
        timestamp: '2024-03-14T16:45:00Z',
        from: 'IT India',
        to: 'Tech Partners LLC',
        amount: 20000,
        status: 'SUCCESS',
        reason: 'Software license renewal',
        compliance_status: 'APPROVED',
        ai_recommended: true,
        risk_level: 'LOW',
        branch_code: 'IN-BLR-001'
    },
    {
        id: 'tx_004',
        timestamp: '2024-03-14T14:20:00Z',
        from: 'Marketing UK',
        to: 'Digital Services Corp',
        amount: 8000,
        status: 'SUCCESS',
        reason: 'Digital marketing campaign',
        compliance_status: 'APPROVED',
        ai_recommended: false,
        risk_level: 'LOW',
        branch_code: 'UK-LON-001'
    },
    {
        id: 'tx_005',
        timestamp: '2024-03-14T11:10:00Z',
        from: 'Finance SG',
        to: 'Global Solutions Inc',
        amount: 25000,
        status: 'SUCCESS',
        reason: 'Annual service contract',
        compliance_status: 'APPROVED',
        ai_recommended: true,
        risk_level: 'LOW',
        branch_code: 'SG-SIN-001'
    },
    {
        id: 'tx_006',
        timestamp: '2024-03-13T15:30:00Z',
        from: 'HR UAE',
        to: 'External Vendor Ltd.',
        amount: 5000,
        status: 'SUCCESS',
        reason: 'HR software subscription',
        compliance_status: 'APPROVED',
        ai_recommended: false,
        risk_level: 'LOW',
        branch_code: 'AE-DXB-001'
    },
    {
        id: 'tx_007',
        timestamp: '2024-03-13T13:45:00Z',
        from: 'Operations UK',
        to: 'Trusted Services Co',
        amount: 12000,
        status: 'SUCCESS',
        reason: 'Operations consulting',
        compliance_status: 'APPROVED',
        ai_recommended: true,
        risk_level: 'LOW',
        branch_code: 'UK-MAN-001'
    },
    {
        id: 'tx_008',
        timestamp: new Date(2024, 2, 8).toISOString(),
        from: 'R&D Department',
        to: 'Trusted Services Co',
        amount: 45000,
        status: 'SUCCESS',
        reason: 'Technical consulting services',
        compliance_status: 'APPROVED',
        ai_recommended: false,
        risk_level: 'MEDIUM'
    },
    {
        id: 'tx_009',
        timestamp: new Date(2024, 2, 9).toISOString(),
        from: 'Marketing Department',
        to: 'BadVendor Corp',
        amount: 10000,
        status: 'FAILED',
        reason: 'Marketing services',
        compliance_status: 'REJECTED',
        ai_recommended: false,
        risk_level: 'HIGH'
    },
    {
        id: 'tx_010',
        timestamp: new Date(2024, 2, 10).toISOString(),
        from: 'Finance Department',
        to: 'Suspicious Inc',
        amount: 30000,
        status: 'FAILED',
        reason: 'Financial services',
        compliance_status: 'REJECTED',
        ai_recommended: false,
        risk_level: 'HIGH'
    }
];
