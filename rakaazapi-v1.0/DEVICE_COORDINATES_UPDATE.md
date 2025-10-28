# Device Coordinates Update Feature

## Overview
This update adds the ability to store and update device latitude and longitude coordinates when creating or updating sensor group mappings.

## Changes Made

### 1. Database Schema Updates
- Added `latitude` and `longitude` columns to the `tbl_devices` table
- Added index for better query performance on location-based searches

### 2. Model Updates (`app/models/devices.model.js`)
- Added `updateDeviceCoordinates()` method to update device coordinates
- Updated `createDevice()` method to include latitude and longitude fields
- Updated `updateDevice()` method to include latitude and longitude fields

### 3. Controller Updates (`app/controllers/sensor-group-mapping.controller.js`)
- Modified `createSensorGroupMapping()` to accept `latitude` and `longitude` parameters
- Modified `updateSensorGroupMapping()` to accept `latitude` and `longitude` parameters
- Added automatic device coordinate updates after successful sensor group mapping creation/update
- Added devices model import

## API Usage

### Create Sensor Group Mapping with Device Coordinates
```json
POST /api/sensor-group-mapping
{
    "sensor_type": 1,
    "sensor_group": 2,
    "customer_id": 3,
    "device_id": 4,
    "status": "active",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```

### Update Sensor Group Mapping with Device Coordinates
```json
PUT /api/sensor-group-mapping/:id
{
    "sensor_type": 1,
    "sensor_group": 2,
    "customer_id": 3,
    "device_id": 4,
    "status": "active",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```

## Database Migration
Run the SQL script `add_device_coordinates.sql` to add the required columns to your database:

```sql
ALTER TABLE tbl_devices 
ADD COLUMN latitude DECIMAL(10, 8) NULL COMMENT 'Device latitude coordinate',
ADD COLUMN longitude DECIMAL(11, 8) NULL COMMENT 'Device longitude coordinate';

CREATE INDEX idx_device_coordinates ON tbl_devices(latitude, longitude);
```

## Features
- **Automatic Updates**: Device coordinates are automatically updated when sensor group mappings are created or updated
- **Error Handling**: Coordinate update errors are logged but don't fail the main operation
- **Backward Compatibility**: Latitude and longitude parameters are optional
- **Data Validation**: Coordinates are stored as DECIMAL(10,8) for latitude and DECIMAL(11,8) for longitude

## Notes
- If latitude and longitude are not provided, the device coordinates will not be updated
- Coordinate update errors are logged but don't prevent the sensor group mapping operation from succeeding
- The feature maintains backward compatibility with existing API calls
