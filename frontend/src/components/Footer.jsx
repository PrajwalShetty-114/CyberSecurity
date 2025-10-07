import React, { useState } from 'react';
import { Box, Container, Typography, Link, Select, MenuItem } from '@mui/material';

export default function Footer() {
  const [lang, setLang] = useState('en');

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        borderTop: '1px solid rgba(148,163,184,0.12)',
        background: 'rgba(17,24,39,0.4)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Digital Shield Academy
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Link href="#" underline="hover" color="text.secondary">About</Link>
          <Link href="#" underline="hover" color="text.secondary">Privacy</Link>
          <Link href="#" underline="hover" color="text.secondary">Terms</Link>
          <Select
            size="small"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            sx={{
              minWidth: 120,
              color: 'text.secondary',
              borderColor: 'rgba(148,163,184,0.18)'
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिन्दी</MenuItem>
            <MenuItem value="kn">ಕನ್ನಡ</MenuItem>
            <MenuItem value="ta">தமிழ்</MenuItem>
            <MenuItem value="te">తెలుగు</MenuItem>
          </Select>
        </Box>
      </Container>
    </Box>
  );
}

