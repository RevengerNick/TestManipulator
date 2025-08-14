import { TextField, Typography, Box, Button, Slider } from "@mui/material";

interface ControlPanelProps {
    originalCommand: string;
    setOriginalCommand: (cmd: string) => void;
    optimizedCommand: string;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    isAnimating: boolean;
    onStart: () => void;
}

export const ControlPanel = ({
    originalCommand, setOriginalCommand, optimizedCommand,
    animationSpeed, setAnimationSpeed, isAnimating, onStart
}: ControlPanelProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            <TextField
                label="Последовательность команд"
                variant="outlined"
                value={originalCommand}
                onChange={(e) => setOriginalCommand(e.target.value)}
                placeholder="Например: ППННЛОБ..."
            />
            <TextField
                label="Оптимизированная команда"
                variant="filled"
                value={optimizedCommand}
                InputProps={{ readOnly: true }}
                helperText="Обновляется в реальном времени"
            />
            <Box sx={{ mt: 1 }}>
                <Typography gutterBottom sx={{ fontWeight: 500, color: '#34495e' }}>
                    Скорость анимации
                </Typography>
                <Slider
                    value={animationSpeed}
                    onChange={(_, newValue) => setAnimationSpeed(newValue as number)}
                    valueLabelDisplay="auto"
                    step={50} marks min={50} max={1000}
                    disabled={isAnimating}
                />
            </Box>
            <Button
                variant="contained" size="large" onClick={onStart} disabled={isAnimating || !originalCommand}
                sx={{
                    mt: 2, py: 1.5, fontWeight: 'bold', borderRadius: '12px',
                    background: 'linear-gradient(45deg, #0288d1 30%, #26c6da 90%)',
                    boxShadow: '0 4px 12px 0 rgba(2, 136, 209, 0.3)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0 6px 16px 0 rgba(2, 136, 209, 0.35)',
                    }
                }}
            >
                {isAnimating ? "Выполнение..." : "Запустить симуляцию"}
            </Button>
        </Box>
    );
};