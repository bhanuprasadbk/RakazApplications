const db = require('../config/db');

module.exports = {
    // Get all sensor group mappings
    getAllSensorGroupMappings: (organization_id, callback) => {
        const query = `
            SELECT sgm.id,d.deviceId,c.customer_name,sg.sensor_group_name,s.sensortype,d.devicemake, d.devicemodel,sgm.fine_amount,sgm.penalty,sgm.penalty_per,
sgm.frequency,sgm.frequency_per,sgm.warning,sgm.warning_per,sgm.reset_type,d.device_latitude,d.device_longitude FROM tbl_sensor_group_mapping sgm
LEFT JOIN tbl_sensors s ON sgm.sensor_type = s.id
LEFT JOIN tbl_sensor_group sg ON sg.id = sgm.sensor_group
LEFT JOIN tbl_devices d ON d.id = sgm.device_id
LEFT JOIN tbl_customers c ON c.id=sgm.customer_id
WHERE sgm.is_deleted = 0 AND sgm.organization_id = ?

        `;
        db.query(query, [organization_id], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get sensor group mapping by ID
    getSensorGroupMappingById: (id, callback) => {
        const query = `
            SELECT sgm.*, 
                   s.sensortype as sensor_type_name,
                   sg.sensor_group_name as sensor_group_name,
                   c.customer_name,
                   d.deviceName as device_name,d.devicemake as device_make,d.devicemodel as device_model,d.device_longitude,d.device_latitude
            FROM tbl_sensor_group_mapping sgm
            LEFT JOIN tbl_sensors s ON sgm.sensor_type = s.id
            LEFT JOIN tbl_sensor_group sg ON sgm.sensor_group = sg.id
            LEFT JOIN tbl_customers c ON sgm.customer_id = c.id
            LEFT JOIN tbl_devices d ON sgm.device_id = d.id
            WHERE sgm.id = ? AND sgm.is_deleted = 0
        `;
        db.query(query, [id], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            
            if (results.length === 0) {
                return callback(null, null);
            }
            
            return callback(null, results[0]);
        });
    },

    // Get sensor group mappings by customer ID
    getSensorGroupMappingsByCustomer: (customerId, callback) => {
        const query = `
            SELECT sgm.*, 
                   s.sensortype as sensor_type_name,
                   sg.sensor_group_name as sensor_group_name,
                   c.customer_name,
                   d.deviceName as device_name
            FROM tbl_sensor_group_mapping sgm
            LEFT JOIN tbl_sensors s ON sgm.sensor_type = s.id
            LEFT JOIN tbl_sensor_group sg ON sgm.sensor_group = sg.id
            LEFT JOIN tbl_customers c ON sgm.customer_id = c.id
            LEFT JOIN tbl_devices d ON sgm.device_id = d.id
            WHERE sgm.customer_id = ? AND sgm.is_deleted = 0
            ORDER BY sgm.created_on DESC
        `;
        db.query(query, [customerId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get sensor group mappings by device ID
    getSensorGroupMappingsByDevice: (deviceId, callback) => {
        const query = `
            SELECT sgm.*, 
                   s.sensortype as sensor_type_name,
                   sg.sensor_group_name as sensor_group_name,
                   c.customer_name,
                   d.deviceName as device_name
            FROM tbl_sensor_group_mapping sgm
            LEFT JOIN tbl_sensors s ON sgm.sensor_type = s.id
            LEFT JOIN tbl_sensor_group sg ON sgm.sensor_group = sg.id
            LEFT JOIN tbl_customers c ON sgm.customer_id = c.id
            LEFT JOIN tbl_devices d ON sgm.device_id = d.id
            WHERE sgm.device_id = ? AND sgm.is_deleted = 0
            ORDER BY sgm.created_on DESC
        `;
        db.query(query, [deviceId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get sensor group mappings by sensor group ID
    getSensorGroupMappingsBySensorGroup: (sensorGroupId, callback) => {
        const query = `
            SELECT sgm.*, 
                   s.sensortype as sensor_type_name,
                   sg.sensor_group_name as sensor_group_name,
                   c.customer_name,
                   d.deviceName as device_name
            FROM tbl_sensor_group_mapping sgm
            LEFT JOIN tbl_sensors s ON sgm.sensor_type = s.id
            LEFT JOIN tbl_sensor_group sg ON sgm.sensor_group = sg.id
            LEFT JOIN tbl_customers c ON sgm.customer_id = c.id
            LEFT JOIN tbl_devices d ON sgm.device_id = d.id
            WHERE sgm.sensor_group = ? AND sgm.is_deleted = 0
            ORDER BY sgm.created_on DESC
        `;
        db.query(query, [sensorGroupId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get sensor group mappings by status
    getSensorGroupMappingsByStatus: (status, callback) => {
        const query = `
            SELECT sgm.*, 
                   s.sensortype as sensor_type_name,
                   sg.sensor_group_name as sensor_group_name,
                   c.customer_name,
                   d.deviceName as device_name
            FROM tbl_sensor_group_mapping sgm
            LEFT JOIN tbl_sensors s ON sgm.sensor_type = s.id
            LEFT JOIN tbl_sensor_group sg ON sgm.sensor_group = sg.id
            LEFT JOIN tbl_customers c ON sgm.customer_id = c.id
            LEFT JOIN tbl_devices d ON sgm.device_id = d.id
            WHERE sgm.status = ? AND sgm.is_deleted = 0
            ORDER BY sgm.created_on DESC
        `;
        db.query(query, [status], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Create new sensor group mapping
    createSensorGroupMapping: (data, callback) => {
        const query = `
            INSERT INTO tbl_sensor_group_mapping 
            (sensor_type, sensor_group, customer_id, device_id, fine_amount, frequency, frequency_per, warning, warning_per, penalty, penalty_per, reset_type, organization_id,status, created_by, created_on)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?,?,NOW())
        `;
        const values = [
            data.sensor_type,
            data.sensor_group,
            data.customer_id,
            data.device_id,
            data.fine_amount,
            data.frequency,
            data.frequency_per,
            data.warning,
            data.warning_per,
            data.penalty,
            data.penalty_per,
            data.reset_type,
            data.organization_id,
            data.status || 'active',
            data.created_by
        ];
        
        db.query(query, values, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.insertId);
        });
    },

    // Update sensor group mapping
    updateSensorGroupMapping: (id, data, callback) => {
        const query = `
        UPDATE tbl_sensor_group_mapping 
        SET 
            sensor_type = ?, 
            sensor_group = ?, 
            customer_id = ?, 
            device_id = ?, 
            fine_amount = ?, 
            frequency = ?, 
            frequency_per = ?, 
            warning = ?, 
            warning_per = ?, 
            penalty = ?, 
            penalty_per = ?, 
            reset_type = ?, 
            organization_id = ?, 
            status = ?, 
            modified_by = ?, 
            modified_on = NOW()
        WHERE id = ? AND is_deleted = 0
    `;
    const values = [
        data.sensor_type,
        data.sensor_group,
        data.customer_id,
        data.device_id,
        data.fine_amount,
        data.frequency,
        data.frequency_per,
        data.warning,
        data.warning_per,
        data.penalty,
        data.penalty_per,
        data.reset_type,
        data.organization_id,
        data.status || 'active',
        data.modified_by,
        id
    ];

        
        db.query(query, values, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.affectedRows > 0);
        });
    },  

    // Update sensor group mapping status
    updateSensorGroupMappingStatus: (id, status, modifiedBy, callback) => {
        const query = `
            UPDATE tbl_sensor_group_mapping 
            SET status = ?, modified_by = ?, modified_on = NOW()
            WHERE id = ? AND is_deleted = 0
        `;
        
        db.query(query, [status, modifiedBy, id], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.affectedRows > 0);
        });
    },

    // Soft delete sensor group mapping
    deleteSensorGroupMapping: (id, deletedBy, callback) => {
        const query = `
            UPDATE tbl_sensor_group_mapping 
            SET is_deleted = 1, modified_by = ?, modified_on = NOW()
            WHERE id = ? AND is_deleted = 0
        `;
        
        db.query(query, [deletedBy, id], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.affectedRows > 0);
        });
    },

    // Check if mapping already exists for the same combination
    checkMappingExists: (sensorType, sensorGroup, customerId, deviceId, callback) => {
        const query = `
            SELECT id FROM tbl_sensor_group_mapping 
            WHERE sensor_type = ? AND sensor_group = ? AND customer_id = ? AND device_id = ? AND is_deleted = 0
        `;
        
        db.query(query, [sensorType, sensorGroup, customerId, deviceId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.length > 0);
        });
    },

    // Check if sensor group is already mapped to any other customer
    checkSensorGroupCustomerMapping: (sensorGroup, customerId, callback) => {
        const query = `
            SELECT id, customer_id, device_id FROM tbl_sensor_group_mapping 
            WHERE sensor_group = ? AND customer_id != ? AND is_deleted = 0
        `;
        
        db.query(query, [sensorGroup, customerId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Check if sensor group is already mapped to any customer (for global validation)
    checkSensorGroupAnyCustomerMapping: (sensorGroup, callback) => {
        const query = `
            SELECT id, customer_id, device_id FROM tbl_sensor_group_mapping 
            WHERE sensor_group = ? AND is_deleted = 0
        `;
        
        db.query(query, [sensorGroup], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Check if sensor group is available for mapping to a specific customer
    checkSensorGroupAvailability: (sensorGroup, customerId, callback) => {
        const query = `
            SELECT 
                CASE 
                    WHEN COUNT(*) = 0 THEN 'available'
                    WHEN COUNT(*) > 0 AND customer_id = ? THEN 'mapped_to_same_customer'
                    ELSE 'mapped_to_other_customer'
                END as status,
                GROUP_CONCAT(DISTINCT customer_id) as mapped_customers
            FROM tbl_sensor_group_mapping 
            WHERE sensor_group = ? AND is_deleted = 0
        `;
        
        db.query(query, [customerId, sensorGroup], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results[0]);
        });
    },

    // Get all SensorTypes
    getAllSensorTypes: (callback) => {
        const query = `
            SELECT id, sensortype, status, created_on, modified_on
            FROM tbl_sensors 
            WHERE is_deleted = 0
            ORDER BY sensortype ASC
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get SensorTypes by status
    getSensorTypesByStatus: (status, callback) => {
        const query = `
            SELECT id, sensortype, status, created_on, modified_on
            FROM tbl_sensors 
            WHERE status = ? AND is_deleted = 0
            ORDER BY sensortype ASC
        `;
        
        db.query(query, [status], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get all Groups of SensorTypes
    getAllSensorGroups: (callback) => {
        const query = `
            SELECT sg.id, sg.sensor_group_name, sg.sensor_type, s.sensortype as sensor_type_name,
                   sg.status, sg.created_on, sg.modified_on
            FROM tbl_sensor_group sg
            LEFT JOIN tbl_sensors s ON sg.sensor_type = s.id
            WHERE sg.is_deleted = 0
            ORDER BY sg.sensor_group_name ASC
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get SensorGroups by sensor type
    getSensorGroupsBySensorType: (sensorTypeId, callback) => {
        const query = `
            SELECT sg.id, sg.sensor_group_name, sg.sensor_type, s.sensortype as sensor_type_name,
                   sg.status, sg.created_on, sg.modified_on
            FROM tbl_sensor_group sg
            LEFT JOIN tbl_sensors s ON sg.sensor_type = s.id
            WHERE sg.sensor_type = ? AND sg.is_deleted = 0
            ORDER BY sg.sensor_group_name ASC
        `;
        
        db.query(query, [sensorTypeId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get SensorGroups by status
    getSensorGroupsByStatus: (status, callback) => {
        const query = `
            SELECT sg.id, sg.sensor_group_name, sg.sensor_type, s.sensortype as sensor_type_name,
                   sg.status, sg.created_on, sg.modified_on
            FROM tbl_sensor_group sg
            LEFT JOIN tbl_sensors s ON sg.sensor_type = s.id
            WHERE sg.status = ? AND sg.is_deleted = 0
            ORDER BY sg.sensor_group_name ASC
        `;
        
        db.query(query, [status], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get parameters associated to groups
    getParametersBySensorGroup: (sensorGroupId, callback) => {
        const query = `
            SELECT sgp.id, sgp.sensor_group_id, sgp.sensor_parameter, sgp.unit,
                   sgp.min_threshold_limit, sgp.max_threshold_limit,
                   sg.sensor_group_name, s.sensortype as sensor_type_name
            FROM tbl_sensor_group_parameters sgp
            LEFT JOIN tbl_sensor_group sg ON sgp.sensor_group_id = sg.id
            LEFT JOIN tbl_sensors s ON sg.sensor_type = s.id
            WHERE sgp.sensor_group_id = ?
            ORDER BY sgp.id ASC
        `;
        
        db.query(query, [sensorGroupId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get all parameters for all groups
    getAllGroupParameters: (body, callback) => {
        const organization_id = body.organization_id;
        const query = `
            SELECT sgp.id, sgp.sensor_group_id, sgp.sensor_parameter, sgp.unit,
                   sgp.min_threshold_limit, sgp.max_threshold_limit,
                   sg.sensor_group_name, sg.sensor_type, s.sensortype as sensor_type_name,
                   sep.sensorParameter as sensor_parameter_name
            FROM tbl_sensor_group_parameters sgp
            LEFT JOIN tbl_sensor_group sg ON sgp.sensor_group_id = sg.id
            LEFT JOIN tbl_sensors s ON sg.sensor_type = s.id
            LEFT JOIN tbl_sensor_parameters sep ON sgp.sensor_parameter = sep.id
            WHERE sg.is_deleted = 0 and sg.organization_id = ?
            ORDER BY s.sensortype ASC, sg.sensor_group_name ASC, sgp.id ASC
        `;
        
        db.query(query, [organization_id], (error, results) => {

            console.log(`--------------------${organization_id}`,results);
            if (error) {
                return callback(error, null);
            }
            
            // Group the results by sensor type and then by sensor group
            const groupedData = {};
            
            results.forEach(row => {
                const sensorTypeId = row.sensor_type;
                const sensorTypeName = row.sensor_type_name;
                const sensorGroupId = row.sensor_group_id;
                const sensorGroupName = row.sensor_group_name;
                
                // Initialize sensor type if not exists
                if (!groupedData[sensorTypeId]) {
                    groupedData[sensorTypeId] = {
                        sensortypeid: sensorTypeId,
                        sensortype: sensorTypeName,
                        sensorgroups: {}
                    };
                }
                
                // Initialize sensor group if not exists
                if (!groupedData[sensorTypeId].sensorgroups[sensorGroupId]) {
                    groupedData[sensorTypeId].sensorgroups[sensorGroupId] = {
                        sensor_group_id: sensorGroupId,
                        sensor_group_name: sensorGroupName,
                        parameters: []
                    };
                }
                
                // Add parameter to the sensor group
                groupedData[sensorTypeId].sensorgroups[sensorGroupId].parameters.push({
                    id: row.id,
                    sensor_parameter: row.sensor_parameter,
                    sensor_parameter_name: row.sensor_parameter_name,
                    unit: row.unit,
                    min_threshold_limit: row.min_threshold_limit,
                    max_threshold_limit: row.max_threshold_limit
                });
            });
            
            // Convert to array format
            const finalResult = Object.values(groupedData).map(sensorType => ({
                ...sensorType,
                sensorgroups: Object.values(sensorType.sensorgroups)
            }));
            
            return callback(null, finalResult);
        });
    },

    // Get parameters by sensor type
    getParametersBySensorType: (sensorTypeId, callback) => {
        const query = `
            SELECT sgp.id, sgp.sensor_group_id, sgp.sensor_parameter, sgp.unit,
                   sgp.min_threshold_limit, sgp.max_threshold_limit,
                   sg.sensor_group_name, s.sensortype as sensor_type_name
            FROM tbl_sensor_group_parameters sgp
            LEFT JOIN tbl_sensor_group sg ON sgp.sensor_group_id = sg.id
            LEFT JOIN tbl_sensors s ON sg.sensor_type = s.id
            WHERE sg.sensor_type = ? AND sgp.is_deleted = 0
            ORDER BY sg.sensor_group_name ASC, sgp.id ASC
        `;
        
        db.query(query, [sensorTypeId], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },

    // Get comprehensive data: SensorTypes with their Groups and Parameters
    getSensorTypesWithGroupsAndParameters: (callback) => {
        const query = `
            SELECT 
                s.id as sensor_type_id,
                s.sensortype as sensor_type_name,
                s.status as sensor_type_status,
                sg.id as sensor_group_id,
                sg.sensor_group_name,
                sg.status as sensor_group_status,
                sgp.id as parameter_id,
                sgp.sensor_parameter,
                sgp.unit,
                sgp.min_threshold_limit,
                sgp.max_threshold_limit
            FROM tbl_sensors s
            LEFT JOIN tbl_sensor_group sg ON s.id = sg.sensor_type AND sg.is_deleted = 0
            LEFT JOIN tbl_sensor_group_parameters sgp ON sg.id = sgp.sensor_group_id
            WHERE s.is_deleted = 0
            ORDER BY s.sensortype ASC, sg.sensor_group_name ASC, sgp.id ASC
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            
            // Group the results by sensor type and sensor group
            const groupedData = {};
            
            results.forEach(row => {
                const sensorTypeId = row.sensor_type_id;
                const sensorGroupId = row.sensor_group_id;
                
                if (!groupedData[sensorTypeId]) {
                    groupedData[sensorTypeId] = {
                        sensor_type_id: sensorTypeId,
                        sensor_type_name: row.sensor_type_name,
                        sensor_type_status: row.sensor_type_status,
                        sensor_groups: {}
                    };
                }
                
                if (sensorGroupId && !groupedData[sensorTypeId].sensor_groups[sensorGroupId]) {
                    groupedData[sensorTypeId].sensor_groups[sensorGroupId] = {
                        sensor_group_id: sensorGroupId,
                        sensor_group_name: row.sensor_group_name,
                        sensor_group_status: row.sensor_group_status,
                        parameters: []
                    };
                }
                
                if (row.parameter_id && sensorGroupId) {
                    groupedData[sensorTypeId].sensor_groups[sensorGroupId].parameters.push({
                        parameter_id: row.parameter_id,
                        sensor_parameter: row.sensor_parameter,
                        unit: row.unit,
                        min_threshold_limit: row.min_threshold_limit,
                        max_threshold_limit: row.max_threshold_limit
                    });
                }
            });
            
            // Convert to array format
            const finalResult = Object.values(groupedData).map(sensorType => ({
                ...sensorType,
                sensor_groups: Object.values(sensorType.sensor_groups)
            }));
            
            return callback(null, finalResult);
        });
    },
    getAllCustomersForSensorGroupMapping: (body, callback) => {
        const limit = body.limit || 10;
        const page = body.page || 1;
        const offset = (page - 1) * limit;
        const search = body.search || '';
        const organization_id = body.organization_id;
    
        if (isNaN(offset) || isNaN(limit) || offset < 0 || limit <= 0) {
            return callback(new Error('Invalid pagination parameters'), null);
        }
    
        const searchCondition = `
            WHERE (
                c.customer_id LIKE ? 
                OR c.organization_name LIKE ? 
                OR c.email LIKE ? 
                OR c.contact_number LIKE ?
                OR c.customer_name LIKE ?
                OR cat.cust_type LIKE ?
                OR c.address LIKE ?
                OR co.name LIKE ?
                OR s.name LIKE ?
                OR ci.name LIKE ?
            )
            AND c.is_deleted = 0 AND c.role_id = 3 AND c.customer_admin_org = ?
        `;
    
        const baseCondition = `
            WHERE c.is_deleted = 0 AND c.role_id = 3 AND c.customer_admin_org = ?
        `;
    
        const query = `
            SELECT c.*, 
                   cat.customer_type as customer_type_name,
                   co.name as country_name,
                   s.name as state_name,
                   ci.name as city_name,
                   sub.plan_name as plan_name
            FROM tbl_customers c
            LEFT JOIN tbl_customer_type cat ON c.customer_type = cat.id
            LEFT JOIN tbl_countries co ON c.country_id = co.id
            LEFT JOIN tbl_states s ON c.state_id = s.id
            LEFT JOIN tbl_cities ci ON c.city_id = ci.id
            LEFT JOIN tbl_subscriptions sub ON c.plan_id = sub.id
            ${search ? searchCondition : baseCondition}
            ORDER BY c.organization_name
            LIMIT ? OFFSET ?
        `;
    
        const queryParams = search
            ? [...Array(10).fill(`%${search}%`), organization_id, limit, offset]
            : [organization_id, limit, offset];
    
        db.query(query, queryParams, (error, results) => {
            if (error) return callback(error, null);
    
            const countQuery = `
                SELECT COUNT(*) as total
                FROM tbl_customers c
                LEFT JOIN tbl_customer_type cat ON c.customer_type = cat.id
                LEFT JOIN tbl_countries co ON c.country_id = co.id
                LEFT JOIN tbl_states s ON c.state_id = s.id
                LEFT JOIN tbl_cities ci ON c.city_id = ci.id
                LEFT JOIN tbl_subscriptions sub ON c.plan_id = sub.id
                ${search ? searchCondition : baseCondition}
            `;
    
            const countParams = search
                ? [...Array(10).fill(`%${search}%`), organization_id]
                : [organization_id];
    
            db.query(countQuery, countParams, (countErr, countResults) => {
                if (countErr) return callback(countErr, null);
    
                const total = countResults[0].total;
                const totalPages = Math.ceil(total / limit);
    
                return callback(null, {
                    data: results,
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages
                    }
                });
            });
        });
    }
    

};
