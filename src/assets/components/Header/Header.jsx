import { AppBar, FormControl, InputBase, MenuItem, Toolbar, Select, Typography, Switch, Button } from "@mui/material";

function Header({ search, onSearchChange, region, onRegionChange, isIndependent, onIndependentToggle, onClearFilters, subregion, subregions, onSubregionChange }) {


    return (
        <AppBar position="static" sx={{ padding: "10px", backgroundColor: "#f1f1f1" }}>
            <Toolbar sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <InputBase placeholder="search..." value={search} onChange={(e) => onSearchChange(e.target.value)} sx={{ height: 40, backgroundColor: 'white', borderRadius: 1, padding: '0 10px', flex: '1 1 300px' }} />
                <FormControl sx={{ minWidth: 150, height: 40, backgroundColor: 'white', borderRadius: 1 }}>
                    <Select displayEmpty sx={{ height: 40 }} value={region}
                        onChange={(e) => {
                            console.log("Region changed:", e.target.value);
                            onRegionChange(e.target.value);
                        }}
                    >
                        <MenuItem value="">All regions</MenuItem>
                        <MenuItem value="Asia">Asia</MenuItem>
                        <MenuItem value="Africa">Africa</MenuItem>
                        <MenuItem value="North America">North America</MenuItem>
                        <MenuItem value="South America">South America</MenuItem>
                        <MenuItem value="Antarctica">Antarctica</MenuItem>
                        <MenuItem value="Europe">Europe</MenuItem>
                        <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                </FormControl>
                {
                    region && (
                        <FormControl sx={{ minWidth: 150, height: 40, backgroundColor: 'white', borderRadius: 1 }}>
                            <Select displayEmpty sx={{ height: 40 }} value={subregion} onChange={(e) => {
                                console.log("Subregion changed", e.target.value);
                                onSubregionChange(e.target.value)
                            }}>
                                {/* <MenuItem value="">All</MenuItem>
                                <MenuItem value="ewgewrg">ewgewrg</MenuItem>
                                <MenuItem value="rgggr">rgggr</MenuItem> */}
                                <MenuItem value="">All</MenuItem>
                                {
                                    subregions.map((sub) => (
                                        <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                }
                <Typography>
                    Independent
                    <Switch checked={isIndependent} onChange={onIndependentToggle} />
                </Typography>
                <Button variant="contained" color="secondary" onClick={onClearFilters}>Clear Filter</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;