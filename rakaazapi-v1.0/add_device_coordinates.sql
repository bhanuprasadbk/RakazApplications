-- Add latitude and longitude columns to tbl_devices table
-- This script adds coordinate fields to store device location information

ALTER TABLE tbl_devices 
ADD COLUMN latitude DECIMAL(10, 8) NULL COMMENT 'Device latitude coordinate',
ADD COLUMN longitude DECIMAL(11, 8) NULL COMMENT 'Device longitude coordinate';

-- Add index for better query performance on location-based searches
CREATE INDEX idx_device_coordinates ON tbl_devices(latitude, longitude);

-- Update existing devices with default coordinates if needed (optional)
-- UPDATE tbl_devices SET latitude = 0.0, longitude = 0.0 WHERE latitude IS NULL AND longitude IS NULL;
