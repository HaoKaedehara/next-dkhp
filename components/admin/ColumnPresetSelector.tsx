'use client';
import React from 'react';
import {
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Typography,
  Chip
} from '@mui/material';
import {
  ViewColumn as ViewColumnIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

export type ColumnPreset = {
  id: string;
  name: string;
  description?: string;
  fields: string[];
};

interface ColumnPresetSelectorProps {
  presets: ColumnPreset[];
  currentPreset: string | null;
  onPresetChange: (presetId: string) => void;
  disabled?: boolean;
}

export default function ColumnPresetSelector({
  presets,
  currentPreset,
  onPresetChange,
  disabled = false
}: ColumnPresetSelectorProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePresetSelect = (presetId: string) => {
    onPresetChange(presetId);
    handleClose();
  };

  const currentPresetInfo = presets.find(p => p.id === currentPreset);

  // Quick preset buttons for most common ones
  const quickPresets = presets.slice(0, 3); // First 3 presets as quick buttons
  const otherPresets = presets.slice(3); // Rest in dropdown

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Quick Preset Buttons */}
      <ButtonGroup size="small" disabled={disabled}>
        {quickPresets.map((preset) => (
          <Tooltip key={preset.id} title={preset.description || preset.name}>
            <Button
              variant={currentPreset === preset.id ? 'contained' : 'outlined'}
              onClick={() => onPresetSelect(preset.id)}
              size="small"
            >
              {preset.name}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>

      {/* More Options Dropdown (if there are more presets) */}
      {otherPresets.length > 0 && (
        <>
          <Button
            size="small"
            variant="outlined"
            endIcon={<ExpandMoreIcon />}
            onClick={handleClick}
            disabled={disabled}
          >
            <ViewColumnIcon sx={{ mr: 0.5 }} />
            Khác
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: { minWidth: 200 }
            }}
          >
            {otherPresets.map((preset) => (
              <MenuItem
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                selected={currentPreset === preset.id}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {preset.name}
                  </Typography>
                  {preset.description && (
                    <Typography variant="caption" color="text.secondary">
                      {preset.description}
                    </Typography>
                  )}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      {/* Current Status */}
      {!currentPresetInfo && currentPreset === null && (
        <Chip
          size="small"
          label="Tùy chỉnh"
          variant="outlined"
          color="secondary"
        />
      )}
    </Box>
  );
}