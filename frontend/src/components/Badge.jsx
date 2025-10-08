import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Avatar,
  Chip,
  useTheme
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const Badge = ({ badge, size = 'medium', showDetails = false }) => {
  const theme = useTheme();

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return theme.palette.grey[500];
      case 'rare': return theme.palette.info.main;
      case 'epic': return theme.palette.secondary.main;
      case 'legendary': return theme.palette.warning.main;
      default: return theme.palette.grey[500];
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'module': return <SchoolIcon />;
      case 'achievement': return <TrophyIcon />;
      case 'special': return <StarIcon />;
      case 'streak': return <SpeedIcon />;
      case 'perfect': return <SecurityIcon />;
      default: return <TrophyIcon />;
    }
  };

  const getSizeProps = (size) => {
    switch (size) {
      case 'small':
        return {
          avatarSize: 32,
          titleVariant: 'body2',
          descriptionVariant: 'caption'
        };
      case 'large':
        return {
          avatarSize: 80,
          titleVariant: 'h6',
          descriptionVariant: 'body2'
        };
      default:
        return {
          avatarSize: 48,
          titleVariant: 'subtitle1',
          descriptionVariant: 'body2'
        };
    }
  };

  const sizeProps = getSizeProps(size);

  const badgeContent = (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
        border: `2px solid ${getRarityColor(badge.rarity)}`,
        background: `linear-gradient(135deg, ${getRarityColor(badge.rarity)}10 0%, ${getRarityColor(badge.rarity)}05 100%)`,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 20px ${getRarityColor(badge.rarity)}30`
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: sizeProps.avatarSize,
            height: sizeProps.avatarSize,
            bgcolor: getRarityColor(badge.rarity),
            mb: 2,
            border: `3px solid ${getRarityColor(badge.rarity)}`,
            boxShadow: `0 0 20px ${getRarityColor(badge.rarity)}40`
          }}
        >
          {badge.imageUrl ? (
            <img
              src={badge.imageUrl}
              alt={badge.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            getCategoryIcon(badge.category)
          )}
        </Avatar>

        <Typography
          variant={sizeProps.titleVariant}
          gutterBottom
          sx={{
            fontWeight: 600,
            color: getRarityColor(badge.rarity),
            textShadow: `0 0 10px ${getRarityColor(badge.rarity)}30`
          }}
        >
          {badge.name}
        </Typography>

        <Typography
          variant={sizeProps.descriptionVariant}
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {badge.description}
        </Typography>

        {showDetails && (
          <Box sx={{ width: '100%' }}>
            <Chip
              label={badge.rarity.toUpperCase()}
              size="small"
              sx={{
                bgcolor: getRarityColor(badge.rarity),
                color: 'white',
                fontWeight: 600,
                mb: 1
              }}
            />
            <Chip
              label={badge.category.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{ ml: 1 }}
            />
            {badge.earnedAt && (
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                Earned: {new Date(badge.earnedAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );

  if (size === 'small') {
    return (
      <Tooltip title={badge.description} arrow>
        <Box sx={{ display: 'inline-block' }}>
          {badgeContent}
        </Box>
      </Tooltip>
    );
  }

  return badgeContent;
};

export default Badge;
