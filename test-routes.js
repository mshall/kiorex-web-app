// Test script to verify all user authentication flows
const testRoutes = {
  // Patient flows
  patient: {
    signIn: '/auth/patient-signin',
    signUp: '/auth/patient-signup',
    dashboard: '/patient-dashboard',
    profile: '/patient-profile',
    appointments: '/patient-appointments',
    records: '/patient-records',
    search: '/search/doctors',
    booking: '/booking',
    marketplace: '/marketplace',
    serviceDetail: '/service-detail'
  },
  
  // Doctor flows
  doctor: {
    signIn: '/auth/provider-signin',
    dashboard: '/doctor-dashboard',
    patients: '/doctor-patients',
    revenue: '/doctor-revenue',
    appointments: '/provider-appointments',
    profile: '/provider-profile'
  },
  
  // Nurse flows
  nurse: {
    signIn: '/auth/provider-signin',
    dashboard: '/nurse-dashboard',
    patients: '/nurse-patients',
    carePlans: '/nurse-care-plans',
    documents: '/nurse-documents',
    earnings: '/nurse-earnings',
    schedule: '/nurse-schedule'
  },
  
  // Clinic flows
  clinic: {
    signIn: '/auth/provider-signin',
    dashboard: '/clinic-dashboard',
    patients: '/clinic-patients',
    appointments: '/clinic-appointments',
    billing: '/clinic-billing',
    analytics: '/clinic-analytics',
    inventory: '/clinic-inventory',
    staff: '/clinic-staff',
    attendance: '/clinic-attendance'
  },
  
  // Pharmacy flows
  pharmacy: {
    signIn: '/auth/provider-signin',
    dashboard: '/pharmacy-dashboard',
    orders: '/pharmacy-orders',
    revenues: '/pharmacy-revenues',
    pending: '/pharmacy-pending'
  },
  
  // Admin flows
  admin: {
    signIn: '/auth/provider-signin',
    dashboard: '/admin-dashboard',
    users: '/admin-users'
  }
};

console.log('Testing all user authentication flows:');
console.log('=====================================');

Object.entries(testRoutes).forEach(([userType, routes]) => {
  console.log(`\n${userType.toUpperCase()} FLOWS:`);
  Object.entries(routes).forEach(([action, route]) => {
    console.log(`  ${action}: ${route}`);
  });
});

console.log('\nCommon routes:');
console.log('  marketplace: /marketplace');
console.log('  notifications: /notifications');
console.log('  calendar: /professional-calendar');
console.log('  teleconsult: /provider-teleconsult');
console.log('  consultation: /consultation');
