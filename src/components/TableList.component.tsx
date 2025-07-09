'use client';
import { TableListProps } from '@/model/form.model';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

export default function TableListComponent({
  heads,
  children,
}: TableListProps & { children: React.ReactNode }) {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#b9f6ca',
      color: '#3e4850',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 500, minHeight: 300 }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {heads.map((head, key) => (
                <StyledTableCell
                  style={{ padding: '5px 9px' }}
                  sx={{ bgcolor: 'primary' }}
                  key={key}
                  align={head?.align ? head.align : 'right'}
                >
                  {head.value}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
