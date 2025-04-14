import {
  TableContainer, Avatar, Table, TableHead, TableBody, TableCell, TableRow, Paper,
  TableSortLabel, DialogTitle, Dialog, DialogContent, Box, Typography, TablePagination
} from "@mui/material";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';

function CountriesList({ countries }) {
  const [sortKey, setSortKey] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...countries].sort((a, b) => {
    const get = (c) => {
      switch (sortKey) {
        case 'name': return c.name?.common || '';
        case 'capital': return c.capital?.[0] || '';
        case 'region': return c.region || '';
        case 'subregion': return c.subregion || '';
        case 'language': return c.languages ? Object.values(c.languages)[0] : '';
        case 'currency': return c.currencies ? Object.values(c.currencies)[0]?.name : '';
        case 'independent': return c.independent ? 'Yes' : 'No';
        case 'area': return c.area;
        default: return '';
      }
    };
    const aVal = get(a), bVal = get(b);
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  function handleClick(country) {
    setOpenModal(true);
    setSelected(country);
  }

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    isMobile ? (
      <Box display="flex" flexDirection="column" gap={2} p={2} sx={{overflowY:"auto",paddingBottom:0}}>
        {sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country) => (
          <Paper
            key={country.cca3}
            onClick={() => handleClick(country)}
            sx={{ p: 2, cursor: 'pointer' }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <img src={country.flags?.svg} alt="flag" width={50} />
              <Box>
                <Typography variant="h6">{country.name.common}</Typography>
                <Typography color="textSecondary">{country.capital?.[0] || '—'}</Typography>
                <Typography>region: {country.region}</Typography>
                <Typography>independent: {country.independent ? 'Yes' : 'No'}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
        <TablePagination
          component="div"
          count={sorted.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[7, 14, 28]}
          sx={{flex:"0 0 auto",height:52}}
        />
      </Box>
    ) : (
      <>
        <TableContainer component={Paper} sx={{ width: "100%", flex: 1 }} >
          <Table stickyHeader aria-label="sticky table" style={{ overflowY: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell>Flag</TableCell>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'capital', label: 'Capital' },
                  { key: 'region', label: 'Region' },
                  { key: 'subregion', label: 'Subregion' },
                  { key: 'language', label: 'Language' },
                  { key: 'currency', label: 'Currency' },
                  { key: 'independent', label: 'Independent' },
                  { key: 'area', label: 'Area (km²)' }
                ].map(({ key, label }) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={sortKey === key}
                      direction={sortAsc ? 'asc' : 'desc'}
                      onClick={() => handleSort(key)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country) => {
                const language = country.languages ? Object.values(country.languages)[0] : '—';
                const currency = country.currencies ? Object.values(country.currencies)[0] : null;

                return (
                  <TableRow key={country.cca3} onClick={() => handleClick(country)} hover sx={{ cursor: "pointer" }}>
                    <TableCell><Avatar src={country.flags?.svg} alt={country.name.common} /></TableCell>
                    <TableCell>{country.name.common}</TableCell>
                    <TableCell>{country.capital?.[0] || '—'}</TableCell>
                    <TableCell>{country.region}</TableCell>
                    <TableCell>{country.subregion || '—'}</TableCell>
                    <TableCell>{language}</TableCell>
                    <TableCell>{currency ? `${currency.name} (${currency.symbol})` : '—'}</TableCell>
                    <TableCell>{country.independent ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{country.area.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {selected && (
            <Dialog open={openModal} maxWidth="md" onClose={() => setOpenModal(false)}>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selected.name.common}
                <IconButton onClick={() => setOpenModal(false)}><CloseIcon /></IconButton>
              </DialogTitle>
              <DialogContent sx={{ width: 500 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                  <img src={selected.flags?.svg} alt={selected.name.common} style={{ maxWidth: 120, marginBottom: 10 }} />
                  <Typography><strong>Official name:</strong> {selected.name.official}</Typography>
                  <Typography><strong>Capital:</strong> {selected.capital?.[0] || '—'}</Typography>
                  <Typography><strong>Region:</strong> {selected.region || '—'}</Typography>
                  <Typography><strong>Subregion:</strong> {selected.subregion || '—'}</Typography>
                  <Typography><strong>Languages:</strong> {selected.languages ? Object.values(selected.languages).join(", ") : '—'}</Typography>
                  <Typography><strong>Area:</strong> {selected.area} km²</Typography>
                  <Typography><strong>Currencies:</strong> {
                    selected.currencies
                      ? Object.entries(selected.currencies).map(([code, val]) => `${code} (${val.symbol})`).join(", ")
                      : '—'
                  }</Typography>
                  <Typography><strong>Independent:</strong> {selected.independent ? 'Yes' : 'No'}</Typography>
                </Box>
              </DialogContent>
            </Dialog>
          )}

        </TableContainer>
        <TablePagination
          component="div"
          count={sorted.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[7, 14, 28, 35]}
        />
      </>
    )
  );
}

export default CountriesList;
