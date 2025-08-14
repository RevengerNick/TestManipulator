import { Box } from "@mui/material";
import Crab from './Crab';
import sampleIcon from '../assets/sample.png';

const CELL_SIZE = 90;
const GAP = 18;

interface VisualizationProps {
    fields: string[][];
    manipulatorPos: { y: number; x: number };
    isClawClosed: boolean;
    hasSample: boolean;
    animationSpeed: number;
}

export const Visualization = ({ fields, manipulatorPos, isClawClosed, hasSample, animationSpeed }: VisualizationProps) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
            <Box sx={{ position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
                    {fields.map((row, rowIndex) => (
                        <div style={{ display: 'flex', gap: `${GAP}px` }} key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <Box
                                    key={colIndex}
                                    sx={{
                                        width: CELL_SIZE, height: CELL_SIZE, backgroundColor: '#f8f9fa',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                                        borderRadius: '12px', display: 'flex', justifyContent: 'center',
                                        alignItems: 'center', transition: 'background-color 0.2s ease, border-color 0.2s ease',
                                        border: '1px solid transparent',
                                        '&:hover': { backgroundColor: '#fff', borderColor: '#0288d1' }
                                    }}
                                >
                                    {cell === "образец" && (
                                        <img src={sampleIcon} alt="Образец" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                                    )}
                                </Box>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{
                    position: 'absolute',
                    top: `${manipulatorPos.y * (CELL_SIZE + GAP)}px`,
                    left: `${manipulatorPos.x * (CELL_SIZE + GAP)}px`,
                    width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px`,
                    transition: `all ${animationSpeed / 1000}s cubic-bezier(0.4, 0, 0.2, 1)`,
                    pointerEvents: 'none'
                }}>
                    <Crab isClosed={isClawClosed} hasSample={hasSample} />
                </div>
            </Box>
        </Box>
    );
};