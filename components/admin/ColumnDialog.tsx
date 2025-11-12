import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, FormGroup, FormControlLabel, Checkbox, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

export interface ColumnDialogProps {
    open: boolean;
    onClose: () => void;
    columns: GridColDef[];
    visibleColumns: Record<string, boolean>;
    onChange: (model: Record<string, boolean>, newOrder?: string[]) => void;
    columnOrder?: string[];
    onOrderChange?: (newOrder: string[]) => void;
}

function PaperComponent(props: PaperProps) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    return (
        <Draggable
            nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
            handle="#draggable-col-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

export default function ColumnDialog({ open, onClose, columns, visibleColumns, onChange, columnOrder, onOrderChange }: ColumnDialogProps) {
    // State cho thứ tự cột tạm thời trong dialog
    const [order, setOrder] = React.useState<string[]>(() => columnOrder || columns.map(col => col.field));
    const [dragOver, setDragOver] = React.useState<{ index: number; position: 'above' | 'below' } | null>(null);
    const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (columnOrder) setOrder(columnOrder);
    }, [columnOrder, open]);

    const handleToggle = (field: string) => {
        onChange({ ...visibleColumns, [field]: !visibleColumns[field] }, order);
    };

    // Kéo thả: di chuyển vị trí cột
    const handleDragStart = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('drag-index', idx.toString());
        e.dataTransfer.effectAllowed = 'move';
        setDraggingIndex(idx);
    };
    const handleDragOver = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const position: 'above' | 'below' = e.clientY < midY ? 'above' : 'below';
        if (!dragOver || dragOver.index !== idx || dragOver.position !== position) {
            setDragOver({ index: idx, position });
        }
    };
    const handleDragEnd = () => {
        setDragOver(null);
        setDraggingIndex(null);
    };
    const handleDrop = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
        const fromIdx = Number(e.dataTransfer.getData('drag-index'));
        let targetIdx = idx;
        if (dragOver?.position === 'below') targetIdx = idx + 1;

        // Điều chỉnh chỉ số mục tiêu nếu phần tử được kéo xuất phát trước vị trí chèn
        if (fromIdx < targetIdx) targetIdx -= 1;

        if (fromIdx === targetIdx) {
            setDragOver(null);
            setDraggingIndex(null);
            return;
        }

        const newOrder = [...order];
        const [moved] = newOrder.splice(fromIdx, 1);
        newOrder.splice(targetIdx, 0, moved);
        setOrder(newOrder);
        onOrderChange?.(newOrder);
        setDragOver(null);
        setDraggingIndex(null);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-col-dialog-title"
        >
            <DialogTitle 
                id="draggable-col-dialog-title" 
                sx={{ cursor: 'move', userSelect: 'none' }}
            >
                Chọn & sắp xếp cột hiển thị
            </DialogTitle>
            <DialogContent>
                <List>
                    {order.map((field, idx) => {
                        const col = columns.find(c => c.field === field);
                        if (!col) return null;
                        return (
                            <ListItem
                                key={field}
                                component="div"
                                draggable
                                onDragStart={handleDragStart(idx)}
                                onDragEnd={handleDragEnd}
                                onDrop={handleDrop(idx)}
                                onDragOver={handleDragOver(idx)}
                                sx={{
                                    cursor: 'move',
                                    bgcolor: '#f9f9f9',
                                    mb: 1,
                                    borderRadius: 1,
                                    opacity: draggingIndex === idx ? 0.6 : 1,
                                    borderTop: dragOver?.index === idx && dragOver.position === 'above' ? '2px dashed #1976d2' : '2px solid transparent',
                                    borderBottom: dragOver?.index === idx && dragOver.position === 'below' ? '2px dashed #1976d2' : '2px solid transparent',
                                    transition: 'border 120ms ease'
                                }}
                            >
                                <ListItemIcon>
                                    <DragIndicatorIcon fontSize="small" />
                                </ListItemIcon>
                                <Checkbox
                                    checked={visibleColumns[field] !== false}
                                    onChange={() => handleToggle(field)}
                                />
                                <ListItemText primary={col.headerName || field} />
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
}
