const customersController = require("../controllers/customer.controller");
const { authenticateToken, authorizeRole } = require("../middleware/auth.middleware");

module.exports = app => {
    // Protected routes (authentication required)
    app.post('/api/getcustomers', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getAllCustomers);
    app.get('/api/customers/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin','Customer User']), customersController.getCustomerById);
    app.get('/api/customers/email/:email', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getCustomerByEmail);
    app.get('/api/customers/customer-type/:customerTypeId', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getCustomersByCustomerType);
    app.post('/api/customers/by-organization', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getCustomersByOrganization);
    
    // Admin-only routes
    app.post('/api/customers', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.createCustomer);
    app.put('/api/customers/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.updateCustomer);
    app.delete('/api/customers/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.deleteCustomer);

    app.put('/api/customers/profile/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin','Customer User']), customersController.updateCustomerProfile);
}; 