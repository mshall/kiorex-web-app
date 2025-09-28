# User Flow Test Guide

## Overview
This guide provides comprehensive testing instructions for all user types in the Kiorex Healthcare Web App.

## Test User Credentials

### Patient Users
- **Email**: `patient@example.com` (or any email)
- **Password**: `password123` (or any password)
- **Expected Flow**: Sign In → Patient Dashboard

### Provider Users
- **Email**: `doctor@example.com` (or any email)
- **Password**: `password123` (or any password)
- **Provider Type**: Select from dropdown (Doctor, Nurse, Physiotherapist, Pharmacy, Clinic, Admin)
- **Expected Flow**: Sign In → Appropriate Provider Dashboard

## Authentication Flows

### 1. Patient Authentication
```
Entry Point: /auth/patient-signin
Test Steps:
1. Enter any email and password
2. Click "Sign In"
3. Should redirect to: /patient-dashboard
4. Verify patient-specific navigation appears
```

### 2. Provider Authentication
```
Entry Point: /auth/provider-signin
Test Steps:
1. Enter any email and password
2. Select provider type from dropdown
3. Click "Sign In"
4. Should redirect to appropriate dashboard based on provider type
```

### 3. Legacy Authentication
```
Entry Point: /auth/signin
Test Steps:
1. Enter email with specific keywords:
   - Contains 'doctor' → redirects to /doctor-dashboard
   - Contains 'admin' → redirects to /admin-dashboard
   - Other emails → redirects to /patient-dashboard
2. Enter any password
3. Click "Sign In"
```

## User-Specific Dashboards

### Patient Dashboard (/patient-dashboard)
- **Navigation**: Patient-specific menu
- **Features**: Appointments, Records, Health Metrics, Marketplace
- **Key Pages**:
  - Patient Profile
  - Patient Appointments
  - Patient Records
  - Doctor Search
  - Booking
  - Marketplace

### Doctor Dashboard (/doctor-dashboard)
- **Navigation**: Doctor-specific menu
- **Features**: Patient Management, Revenue, Appointments
- **Key Pages**:
  - Doctor Patients
  - Doctor Revenue
  - Provider Appointments
  - Provider Profile

### Nurse Dashboard (/nurse-dashboard)
- **Navigation**: Nurse-specific menu
- **Features**: Patient Care, Schedule, Documents
- **Key Pages**:
  - Nurse Patients
  - Nurse Care Plans
  - Nurse Documents
  - Nurse Earnings
  - Nurse Schedule

### Clinic Dashboard (/clinic-dashboard)
- **Navigation**: Clinic-specific menu
- **Features**: Staff Management, Billing, Analytics
- **Key Pages**:
  - Clinic Patients
  - Clinic Appointments
  - Clinic Billing
  - Clinic Analytics
  - Clinic Inventory
  - Clinic Staff
  - Clinic Attendance

### Pharmacy Dashboard (/pharmacy-dashboard)
- **Navigation**: Pharmacy-specific menu
- **Features**: Order Management, Revenue Tracking
- **Key Pages**:
  - Pharmacy Orders
  - Pharmacy Revenues
  - Pharmacy Pending

### Admin Dashboard (/admin-dashboard)
- **Navigation**: Admin-specific menu
- **Features**: User Management, System Administration
- **Key Pages**:
  - Admin Users

## Common Features Testing

### Marketplace (/marketplace)
- **Access**: Available to all user types
- **Features**: Service browsing, provider selection
- **Test Steps**:
  1. Navigate to marketplace
  2. Select different service categories
  3. Verify service-specific provider cards appear
  4. Test filtering and search functionality

### Notifications (/notifications)
- **Access**: Available to all user types
- **Features**: Real-time notifications

### Professional Calendar (/professional-calendar)
- **Access**: Available to providers
- **Features**: Schedule management

## Testing Checklist

### ✅ Authentication Tests
- [ ] Patient sign-in redirects to /patient-dashboard
- [ ] Provider sign-in redirects to correct dashboard based on type
- [ ] Legacy sign-in works with email-based routing
- [ ] All authentication forms validate input correctly

### ✅ Navigation Tests
- [ ] Patient navigation shows patient-specific menu items
- [ ] Doctor navigation shows doctor-specific menu items
- [ ] Nurse navigation shows nurse-specific menu items
- [ ] Clinic navigation shows clinic-specific menu items
- [ ] Pharmacy navigation shows pharmacy-specific menu items
- [ ] Admin navigation shows admin-specific menu items

### ✅ Dashboard Tests
- [ ] Patient dashboard loads correctly
- [ ] Doctor dashboard loads correctly
- [ ] Nurse dashboard loads correctly
- [ ] Clinic dashboard loads correctly
- [ ] Pharmacy dashboard loads correctly
- [ ] Admin dashboard loads correctly

### ✅ Feature Tests
- [ ] Marketplace works for all user types
- [ ] Service detail pages load correctly
- [ ] Booking flow works end-to-end
- [ ] Notifications are accessible
- [ ] Calendar is accessible to providers

## Common Issues and Solutions

### Issue: 404 Error on Sign In
- **Cause**: Incorrect redirect path in authentication components
- **Solution**: Verify redirect paths match defined routes in App.tsx

### Issue: Navigation Not Showing
- **Cause**: Missing userType or providerType in navigation state
- **Solution**: Ensure authentication components pass correct state

### Issue: Dashboard Not Loading
- **Cause**: Missing route definition or component import
- **Solution**: Verify route exists in App.tsx and component is imported

## Test Data

### Sample Patient Data
- Name: John Doe
- Email: patient@example.com
- Phone: +1-555-0123

### Sample Provider Data
- Doctor: Dr. Smith
- Nurse: Jane Nurse
- Clinic: City Medical Center
- Pharmacy: HealthPlus Pharmacy

## Notes
- All authentication is currently demo-based (accepts any valid email/password)
- User types are determined by email keywords or provider type selection
- State is passed through navigation to maintain user context
- All routes are defined in src/App.tsx
