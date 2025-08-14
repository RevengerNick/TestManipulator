import { Paper, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const CommandKey = ({ children }: { children: React.ReactNode }) => (
    <Box
        component="span"
        sx={{
            fontFamily: '"Fira Code", "Courier New", monospace', 
            fontWeight: 'bold',
            color: '#1565c0',
            backgroundColor: 'rgba(2, 136, 209, 0.08)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(2, 136, 209, 0.2)',
            marginRight: '12px',
        }}
    >
        {children}
    </Box>
);

const commands = [
    { key: 'Л', description: 'Переместить манипулятор налево' },
    { key: 'П', description: 'Переместить манипулятор направо' },
    { key: 'В', description: 'Переместить манипулятор вверх' },
    { key: 'Н', description: 'Переместить манипулятор вниз' },
    { key: 'О', description: 'Взять образец (захватить)' },
    { key: 'Б', description: 'Бросить образец (отпустить)' },
];

export const ReadmePanel = () => {
    return (
        <Paper elevation={0} sx={{ 
            p: { xs: 2, md: 3 }, 
            height: '100%', 
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Инструкция
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
                {commands.map((cmd) => (
                    <ListItem key={cmd.key} disableGutters>
                        <ListItemText 
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CommandKey>{cmd.key}</CommandKey>
                                    <Typography variant="body2">{cmd.description}</Typography>
                                </Box>
                            } 
                        />  
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Команды можно вводить последовательно, например: <strong>ППОННБ</strong>. Система автоматически оптимизирует их для максимальной эффективности.
            </Typography>
        </Paper>
    );
}   