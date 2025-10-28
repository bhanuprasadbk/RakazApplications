# SensorTypes, Groups, and Parameters API Documentation

This document describes the new API endpoints for managing SensorTypes, Groups of SensorTypes, and Parameters associated to groups.

## Authentication

All endpoints require authentication using JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Authorization

All endpoints require one of the following roles:
- Customer Admin
- Super Admin

## Base URL

```
http://your-domain/api
```

---

## 1. SensorTypes Endpoints

### 1.1 Get All SensorTypes

**Endpoint:** `GET /sensor-types`

**Description:** Retrieves all sensor types from the database.

**Response:**
```json
{
  "success": true,
  "message": "Sensor types fetched successfully",
  "data": [
    {
      "id": 3,
      "sensortype": "Air",
      "status": "Active",
      "created_on": "2025-08-06 18:43:37",
      "modified_on": "2025-08-06 18:43:37"
    },
    {
      "id": 4,
      "sensortype": "Water",
      "status": "Active",
      "created_on": "2025-08-07 11:06:49",
      "modified_on": "2025-08-07 11:06:49"
    }
  ]
}
```

### 1.2 Get SensorTypes by Status

**Endpoint:** `GET /sensor-types/status/:status`

**Parameters:**
- `status` (path parameter): The status to filter by (e.g., "Active", "Inactive")

**Response:**
```json
{
  "success": true,
  "message": "Sensor types fetched successfully",
  "data": [
    {
      "id": 3,
      "sensortype": "Air",
      "status": "Active",
      "created_on": "2025-08-06 18:43:37",
      "modified_on": "2025-08-06 18:43:37"
    }
  ]
}
```

---

## 2. SensorGroups Endpoints

### 2.1 Get All SensorGroups

**Endpoint:** `GET /sensor-groups`

**Description:** Retrieves all sensor groups with their associated sensor type information.

**Response:**
```json
{
  "success": true,
  "message": "Sensor groups fetched successfully",
  "data": [
    {
      "id": 1,
      "sensor_group_name": "Test Sensor Group",
      "sensor_type": 8,
      "sensor_type_name": "Air11",
      "status": "Active",
      "created_on": "2025-08-20 11:10:12",
      "modified_on": "2025-08-20 16:05:41"
    },
    {
      "id": 3,
      "sensor_group_name": "Air Sensor Group",
      "sensor_type": 3,
      "sensor_type_name": "Air",
      "status": "Active",
      "created_on": "2025-08-20 11:51:07",
      "modified_on": "2025-08-20 11:51:07"
    }
  ]
}
```

### 2.2 Get SensorGroups by Sensor Type

**Endpoint:** `GET /sensor-groups/sensor-type/:sensorTypeId`

**Parameters:**
- `sensorTypeId` (path parameter): The ID of the sensor type

**Response:**
```json
{
  "success": true,
  "message": "Sensor groups fetched successfully",
  "data": [
    {
      "id": 3,
      "sensor_group_name": "Air Sensor Group",
      "sensor_type": 3,
      "sensor_type_name": "Air",
      "status": "Active",
      "created_on": "2025-08-20 11:51:07",
      "modified_on": "2025-08-20 11:51:07"
    }
  ]
}
```

### 2.3 Get SensorGroups by Status

**Endpoint:** `GET /sensor-groups/status/:status`

**Parameters:**
- `status` (path parameter): The status to filter by (e.g., "Active", "Inactive")

**Response:**
```json
{
  "success": true,
  "message": "Sensor groups fetched successfully",
  "data": [
    {
      "id": 1,
      "sensor_group_name": "Test Sensor Group",
      "sensor_type": 8,
      "sensor_type_name": "Air11",
      "status": "Active",
      "created_on": "2025-08-20 11:10:12",
      "modified_on": "2025-08-20 16:05:41"
    }
  ]
}
```

---

## 3. Parameters Endpoints

### 3.1 Get All Group Parameters

**Endpoint:** `GET /sensor-group-parameters`

**Description:** Retrieves all parameters for all sensor groups, grouped by sensor type and sensor group.

**Response:**
```json
{
  "success": true,
  "message": "All group parameters fetched successfully",
  "data": [
    {
      "sensortypeid": 3,
      "sensortype": "Air",
      "sensorgroups": [
        {
          "sensor_group_id": 3,
          "sensor_group_name": "Air Sensor Group",
          "parameters": [
            {
              "id": 8,
              "sensor_parameter": "2",
              "unit": "Hz",
              "min_threshold_limit": 4,
              "max_threshold_limit": 2
            },
            {
              "id": 9,
              "sensor_parameter": "1",
              "unit": "C",
              "min_threshold_limit": 7,
              "max_threshold_limit": 3
            }
          ]
        }
      ]
    },
    {
      "sensortypeid": 8,
      "sensortype": "Air11",
      "sensorgroups": [
        {
          "sensor_group_id": 1,
          "sensor_group_name": "Test Sensor Group",
          "parameters": [
            {
              "id": 21,
              "sensor_parameter": "14",
              "unit": "NTU",
              "min_threshold_limit": 3,
              "max_threshold_limit": 2
            },
            {
              "id": 22,
              "sensor_parameter": "13",
              "unit": "mg/L",
              "min_threshold_limit": 7,
              "max_threshold_limit": 6
            }
          ]
        }
      ]
    },
    {
      "sensortypeid": 4,
      "sensortype": "Water",
      "sensorgroups": [
        {
          "sensor_group_id": 4,
          "sensor_group_name": "Water Group",
          "parameters": [
            {
              "id": 24,
              "sensor_parameter": "4",
              "unit": "Hz",
              "min_threshold_limit": 5,
              "max_threshold_limit": 7
            }
          ]
        }
      ]
    }
  ]
}
```

### 3.2 Get Parameters by Sensor Group

**Endpoint:** `GET /sensor-group-parameters/group/:sensorGroupId`

**Parameters:**
- `sensorGroupId` (path parameter): The ID of the sensor group

**Response:**
```json
{
  "success": true,
  "message": "Parameters fetched successfully",
  "data": [
    {
      "id": 8,
      "sensor_group_id": 3,
      "sensor_parameter": 2,
      "unit": "Hz",
      "min_threshold_limit": 4,
      "max_threshold_limit": 2,
      "sensor_group_name": "Air Sensor Group",
      "sensor_type_name": "Air"
    },
    {
      "id": 9,
      "sensor_group_id": 3,
      "sensor_parameter": 1,
      "unit": "C",
      "min_threshold_limit": 7,
      "max_threshold_limit": 3,
      "sensor_group_name": "Air Sensor Group",
      "sensor_type_name": "Air"
    }
  ]
}
```

### 3.3 Get Parameters by Sensor Type

**Endpoint:** `GET /sensor-group-parameters/sensor-type/:sensorTypeId`

**Parameters:**
- `sensorTypeId` (path parameter): The ID of the sensor type

**Response:**
```json
{
  "success": true,
  "message": "Parameters fetched successfully",
  "data": [
    {
      "id": 8,
      "sensor_group_id": 3,
      "sensor_parameter": 2,
      "unit": "Hz",
      "min_threshold_limit": 4,
      "max_threshold_limit": 2,
      "sensor_group_name": "Air Sensor Group",
      "sensor_type_name": "Air"
    }
  ]
}
```

---

## 4. Comprehensive Data Endpoint

### 4.1 Get SensorTypes with Groups and Parameters

**Endpoint:** `GET /sensor-types-comprehensive`

**Description:** Retrieves a hierarchical structure with sensor types, their groups, and associated parameters.

**Response:**
```json
{
  "success": true,
  "message": "Sensor types with groups and parameters fetched successfully",
  "data": [
    {
      "sensor_type_id": 3,
      "sensor_type_name": "Air",
      "sensor_type_status": "Active",
      "sensor_groups": [
        {
          "sensor_group_id": 3,
          "sensor_group_name": "Air Sensor Group",
          "sensor_group_status": "Active",
          "parameters": [
            {
              "parameter_id": 8,
              "sensor_parameter": 2,
              "unit": "Hz",
              "min_threshold_limit": 4,
              "max_threshold_limit": 2
            },
            {
              "parameter_id": 9,
              "sensor_parameter": 1,
              "unit": "C",
              "min_threshold_limit": 7,
              "max_threshold_limit": 3
            }
          ]
        }
      ]
    },
    {
      "sensor_type_id": 4,
      "sensor_type_name": "Water",
      "sensor_type_status": "Active",
      "sensor_groups": [
        {
          "sensor_group_id": 4,
          "sensor_group_name": "Water Group",
          "sensor_group_status": "Active",
          "parameters": [
            {
              "parameter_id": 24,
              "sensor_parameter": 4,
              "unit": "Hz",
              "min_threshold_limit": 5,
              "max_threshold_limit": 7
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Parameter is required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token is missing or invalid"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## Database Schema Reference

### Tables Used:
1. **tbl_sensors** - Stores sensor types
2. **tbl_sensor_group** - Stores sensor groups
3. **tbl_sensor_group_parameters** - Stores parameters associated with sensor groups

### Key Relationships:
- `tbl_sensor_group.sensor_type` → `tbl_sensors.id`
- `tbl_sensor_group_parameters.sensor_group_id` → `tbl_sensor_group.id`

---

## Usage Examples

### Example 1: Get all sensor types
```bash
curl -X GET "http://your-domain/api/sensor-types" \
  -H "Authorization: Bearer your-jwt-token"
```

### Example 2: Get sensor groups for a specific sensor type
```bash
curl -X GET "http://your-domain/api/sensor-groups/sensor-type/3" \
  -H "Authorization: Bearer your-jwt-token"
```

### Example 3: Get parameters for a specific sensor group
```bash
curl -X GET "http://your-domain/api/sensor-group-parameters/group/3" \
  -H "Authorization: Bearer your-jwt-token"
```

### Example 4: Get comprehensive data
```bash
curl -X GET "http://your-domain/api/sensor-types-comprehensive" \
  -H "Authorization: Bearer your-jwt-token"
```
