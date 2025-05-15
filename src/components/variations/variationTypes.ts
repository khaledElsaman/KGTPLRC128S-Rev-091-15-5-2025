import { Database } from '../../lib/database.types';

// Define the Variation type based on the database schema
export type Variation = Database['public']['Tables']['variations_master']['Row'];

// Sample variations data for testing
export const sampleVariations: Variation[] = [
  { 
    id: "VO-001", 
    title: "Scope Addition in Zone A", 
    description: "Additional scope for foundation works in Zone A",
    created_at: "2025-03-01T10:00:00Z",
    status: "Approved", 
    created_by: "user-123",
    value: 150000,
    last_updated_at: "2025-03-05T14:30:00Z",
    last_updated_by: "user-456",
    type: "Scope Change"
  },
  { 
    id: "VO-002", 
    title: "Material Price Adjustment", 
    description: "Adjustment due to steel price increase",
    created_at: "2025-04-10T09:15:00Z",
    status: "Submitted", 
    created_by: "user-123",
    value: 75000,
    last_updated_at: "2025-04-10T09:15:00Z",
    last_updated_by: null,
    type: "Price Adjustment"
  },
  { 
    id: "VO-003", 
    title: "Additional Works - Drainage System", 
    description: "Installation of additional drainage system",
    created_at: "2025-04-15T11:30:00Z",
    status: "Under Review", 
    created_by: "user-789",
    value: 220000,
    last_updated_at: "2025-04-18T16:45:00Z",
    last_updated_by: "user-456",
    type: "Additional Works"
  },
  { 
    id: "VO-004", 
    title: "Time Extension Request", 
    description: "Request for 30-day extension due to weather conditions",
    created_at: "2025-04-20T14:20:00Z",
    status: "Rejected", 
    created_by: "user-789",
    value: 0,
    last_updated_at: "2025-04-25T10:10:00Z",
    last_updated_by: "user-456",
    type: "Time Extension"
  },
  { 
    id: "VO-005", 
    title: "Specification Change - Concrete Grade", 
    description: "Change from Grade 30 to Grade 40 concrete",
    created_at: "2025-05-01T08:45:00Z",
    status: "Draft", 
    created_by: "user-123",
    value: 85000,
    last_updated_at: "2025-05-01T08:45:00Z",
    last_updated_by: null,
    type: "Scope Change"
  }
];