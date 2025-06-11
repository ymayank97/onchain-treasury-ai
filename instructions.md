# Autonomous Transaction Banking Platform - Development Instructions

## Project Overview
You are tasked with building a web-based AI-powered transaction system that simulates inter-department payments within a company. This is a prototype system using mock data - no real cryptocurrency or blockchain integration is required at this stage.

## 🎯 Core Objectives
- Create a simulated banking environment with departments and vendors
- Implement AI agents for transaction recommendations and compliance checking
- Build a clean, functional web interface for managing transfers
- Maintain comprehensive audit logs of all transactions
- Demonstrate end-to-end automated transaction flow

## 🏗️ System Architecture

### Technology Stack
- **Backend**: Python with FastAPI framework
- **Frontend**: Next.js with shadcn/ui components
- **Database**: Choose between Firestore or PostgreSQL
- **Storage**: JSON files or database for transaction logs
- **AI Integration**: OpenAI API for agent decision-making

### Core Components
1. **Mock Wallet System**: Simulate balances for departments and vendors
2. **Transfer Engine**: Handle mock transactions between entities
3. **AI Treasury Agent**: Analyze balances and suggest optimal transfers
4. **AI Compliance Agent**: Validate transactions against business rules
5. **Audit System**: Log all transactions with timestamps and reasons

## 🏢 Business Entities

### Mock Entities and Initial Balances
```json
{
  "Marketing": 50000,
  "Finance": 80000,
  "External Vendor Ltd.": 0
}
```

### Entity Types
- **Departments**: Internal company departments (Marketing, Finance)
- **Vendors**: External service providers
- **System**: Central treasury (if needed for complex scenarios)

## 🤖 AI Agent Specifications

### Treasury Agent
**Purpose**: Analyze department balances and recommend optimal fund transfers

**Prompt Template**:
```
You are a Treasury Management AI Agent. Analyze the current department balances:
{balance_data}

Rules:
- If any department has idle funds > $10,000, suggest a transfer
- Consider upcoming payments to approved vendors
- Prioritize internal transfers for operational efficiency
- Always provide specific from/to/amount and business justification

Respond in JSON format:
{
  "recommendation": "TRANSFER" | "HOLD",
  "from": "department_name",
  "to": "recipient_name", 
  "amount": number,
  "reason": "detailed_business_justification"
}
```

### Compliance Agent
**Purpose**: Validate proposed transactions against business rules and vendor approval lists

**Prompt Template**:
```
You are a Compliance Validation AI Agent. Review this proposed transaction:
From: {from_entity}
To: {to_entity}  
Amount: ${amount}
Reason: {reason}

Validation Rules:
- Check vendor against approved/blacklisted vendors
- Ensure transaction amount is within department limits
- Verify business justification is valid
- Flag any suspicious patterns

Blacklisted Vendors: {blacklist}
Department Limits: {limits}

Respond in JSON format:
{
  "status": "APPROVED" | "REJECTED",
  "reason": "detailed_explanation",
  "risk_level": "LOW" | "MEDIUM" | "HIGH"
}
```

### Mock Data for Compliance
```json
{
  "blacklisted_vendors": ["BadVendor Corp", "Suspicious Inc"],
  "department_limits": {
    "Marketing": 25000,
    "Finance": 50000
  },
  "approved_vendors": ["External Vendor Ltd.", "Trusted Services Co"]
}
```

## 🔌 Backend API Specification

### Core Endpoints

#### Balance Management
```
GET /api/balances
Response: {"Marketing": 50000, "Finance": 80000, "External Vendor Ltd.": 0}
```

#### Transaction Processing
```
POST /api/transfer
Body: {
  "from": "Marketing",
  "to": "External Vendor Ltd.",
  "amount": 10000,
  "reason": "Monthly marketing services payment"
}
Response: {
  "transaction_id": "tx_12345",
  "status": "SUCCESS" | "FAILED",
  "timestamp": "2024-06-07T15:00:00Z",
  "message": "Transfer completed successfully"
}
```

#### AI Agent Integration
```
POST /api/recommend-transfer
Body: {} (uses current balances)
Response: {
  "recommendation": "TRANSFER",
  "from": "Finance", 
  "to": "External Vendor Ltd.",
  "amount": 15000,
  "reason": "Quarterly vendor payment due"
}

POST /api/check-compliance  
Body: {
  "from": "Marketing",
  "to": "External Vendor Ltd.", 
  "amount": 10000,
  "reason": "Marketing services"
}
Response: {
  "status": "APPROVED",
  "reason": "Vendor approved, amount within limits",
  "risk_level": "LOW"
}
```

#### Audit and Logs
```
GET /api/transactions
Response: [
  {
    "id": "tx_12345",
    "timestamp": "2024-06-07T15:00:00Z",
    "from": "Marketing",
    "to": "External Vendor Ltd.",
    "amount": 10000,
    "status": "SUCCESS",
    "reason": "Monthly marketing services payment",
    "compliance_status": "APPROVED"
  }
]
```

## 🎨 Frontend Requirements

### Dashboard Layout
Create a single-page dashboard with these sections:

1. **Balance Overview Cards**
   - Display current balance for each entity
   - Use color coding (green for healthy, yellow for low, red for critical)
   - Include percentage change indicators

2. **AI Recommendation Panel**
   - "Get AI Recommendation" button
   - Display recommended transfer details
   - "Approve & Execute" action button

3. **Quick Transfer Form**
   - Dropdown for From/To selection
   - Amount input with validation
   - Reason text field
   - "Execute Transfer" button

4. **Transaction History**
   - Timeline view of recent transactions
   - Filter by entity, date range, status
   - Expandable details for each transaction

5. **Compliance Status Panel**
   - Real-time compliance check results
   - Risk level indicators
   - Pending approvals list

### UI Components (shadcn/ui)
- `Card` components for balance display
- `Button` with loading states
- `Input` and `Select` for forms
- `Table` for transaction history
- `Badge` for status indicators
- `Alert` for notifications
- `Dialog` for confirmation modals

## 📊 Data Models

### Transaction Record
```json
{
  "id": "tx_unique_id",
  "timestamp": "ISO_8601_datetime",
  "from": "entity_name",
  "to": "entity_name", 
  "amount": "number",
  "status": "SUCCESS | FAILED | PENDING",
  "reason": "business_justification",
  "compliance_status": "APPROVED | REJECTED | PENDING",
  "ai_recommended": "boolean",
  "risk_level": "LOW | MEDIUM | HIGH"
}
```

### Balance Record
```json
{
  "entity_name": "string",
  "current_balance": "number",
  "last_updated": "ISO_8601_datetime",
  "entity_type": "DEPARTMENT | VENDOR | SYSTEM"
}
```

## 🔄 Implementation Workflow

### Phase 1: Backend Foundation
1. Set up FastAPI project with proper structure
2. Create mock data storage (JSON files or database)
3. Implement balance management endpoints
4. Add basic transfer logic with validation
5. Create transaction logging system

### Phase 2: AI Integration
1. Set up OpenAI API client
2. Implement Treasury Agent endpoint with proper prompting
3. Implement Compliance Agent endpoint with rule validation
4. Add error handling for AI service failures
5. Test AI responses with various scenarios

### Phase 3: Frontend Development
1. Initialize Next.js project with shadcn/ui
2. Create dashboard layout with balance cards
3. Build transfer forms with validation
4. Implement transaction history display
5. Add AI recommendation interface

### Phase 4: Integration & Testing
1. Connect frontend to backend endpoints
2. Implement proper error handling and loading states
3. Add real-time updates for balance changes
4. Test complete transaction flow end-to-end
5. Validate AI agent responses and compliance logic

### Phase 5: Polish & Documentation
1. Add comprehensive input validation
2. Implement proper logging and monitoring
3. Create user-friendly error messages
4. Add transaction confirmation dialogs
5. Document API endpoints and usage

## 🧪 Testing Scenarios

### Core Functionality Tests
1. **Basic Transfer**: Marketing → External Vendor Ltd. ($10,000)
2. **AI Recommendation**: Request transfer suggestion when Finance > $50,000
3. **Compliance Rejection**: Attempt transfer to blacklisted vendor
4. **Insufficient Funds**: Attempt transfer exceeding department balance
5. **Large Transfer**: Test department limit validation

### User Journey Tests
1. User views dashboard and current balances
2. User clicks "Get AI Recommendation" 
3. System suggests optimal transfer
4. User approves recommendation
5. System validates compliance
6. Transfer executes and updates balances
7. Transaction appears in history log

## 🚨 Error Handling

### Backend Error Responses
```json
{
  "error": "INSUFFICIENT_FUNDS | INVALID_ENTITY | COMPLIANCE_REJECTED | AI_SERVICE_ERROR",
  "message": "Human-readable error description",
  "details": "Additional context for debugging"
}
```

### Frontend Error Display
- Toast notifications for quick feedback
- Inline form validation messages
- Modal dialogs for critical errors
- Graceful degradation when AI services are unavailable

## 🎁 Expected Deliverables

1. **Working FastAPI Backend**
   - All endpoints functional and documented
   - Mock data properly initialized
   - AI integration working with OpenAI API

2. **Next.js Frontend Application**
   - Responsive dashboard interface
   - All core features implemented
   - Proper error handling and loading states

3. **Documentation**
   - API documentation (auto-generated with FastAPI)
   - Setup and installation instructions
   - User guide for dashboard functionality

4. **Demo Scenarios**
   - Sample data loaded for immediate testing
   - Complete transaction flows working
   - AI agents providing realistic recommendations

## 🔮 Future Enhancement Ideas
- Real blockchain integration (Ethereum, Polygon)
- Multi-signature approval workflows
- Advanced analytics and reporting
- Mobile app development
- Integration with accounting systems
- Multi-currency support
- Automated recurring payments

## 📝 Success Criteria
The prototype is considered successful when:
- Users can view real-time department balances
- AI provides contextually appropriate transfer recommendations
- Compliance validation works correctly with business rules
- Transfers execute and update balances immediately
- Complete audit trail is maintained for all transactions
- Frontend provides intuitive, responsive user experience

Remember: Focus on creating a solid foundation that demonstrates the core concept. Real cryptocurrency integration can be added later once the business logic and user experience are validated.