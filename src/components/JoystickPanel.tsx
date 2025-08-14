import { Paper, Typography, Box, Button, Divider } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface JoystickPanelProps {
  onCommandClick: (command: string) => void;
  isAnimating: boolean;
}

const joystickLayout = [
  null, { cmd: 'В', icon: <ArrowUpwardIcon /> }, null,
  { cmd: 'Л', icon: <ArrowBackIcon /> }, null, { cmd: 'П', icon: <ArrowForwardIcon /> },
  { cmd: 'О', icon: 'О' }, { cmd: 'Н', icon: <ArrowDownwardIcon /> }, { cmd: 'Б', icon: 'Б' },
];

export const JoystickPanel = ({ onCommandClick, isAnimating }: JoystickPanelProps) => {
  const buttonStyles = {
    minWidth: 0,
    width: '100%',
    aspectRatio: '1 / 1',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  return (
    <Paper elevation={0} sx={{
      p: { xs: 2, md: 3 },
      height: '100%',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }}>
      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
        Джойстик
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
        }}
      >
        {joystickLayout.map((item, index) => {
          if (!item) {
            return <Box key={index} />;
          }
          return (
            <Button
              key={index}
              variant="outlined"
              sx={buttonStyles}
              onClick={() => onCommandClick(item.cmd)}
              disabled={isAnimating}
            >
              {item.icon}
            </Button>
          );
        })}
      </Box>
    </Paper>
  );
};