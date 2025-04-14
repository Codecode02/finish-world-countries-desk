import { AppBar, FormControl, InputBase, MenuItem, Toolbar, Select, Typography, Switch, Button } from "@mui/material";

function Header({ search, onSearchChange, region, onRegionChange, isIndependent, onIndependentToggle, onClearFilters, subregion, subregions, onSubregionChange }) {


    return (
        <AppBar sx={{ position: "static", width:"auto" , top: 0, left: { xs: "unset", sm: "0" }, right: { xs: "0", sm: "unset" }, padding: "10px", backgroundColor: "#dddddd", flex: "0 0 auto" }} className="header">
            <Typography variant="h6" component="div">
                WORLD COUNTRIES DESK
            </Typography>
            <Toolbar
                sx={{
                    flexWrap: { sm: "wrap" },
                    gap: { xs:"10px",sm: "12px" },
                    padding: { sm: 0, xs: "10px" },
                    display: { sm: "flex" },
                    position: { xs: "fixed",sm:"static" },
                    width: { xs: "125px",sm:"100%" },
                    right: { xs: 0 },
                    top: { xs: "103px" },
                    left: { xs: "unset" },
                    backgroundColor: { xs: "#dddddd" },
                    borderRadius: { xs: "4px 0 0 4px" },
                    overflow: { xs: "hidden" },
                    display: {  xs: "flex" },
                    flexDirection:{xs:"column",sm:"row"}
                }}
            >

                <InputBase placeholder="search..." value={search} onChange={(e) => onSearchChange(e.target.value)} sx={{ height: 40, backgroundColor: 'white', borderRadius: 1, padding: '0 10px', flex: {xs:"auto"} }} />
                <FormControl sx={{width:{xs:"100%",sm:"auto"}, minWidth: {sm: 150 }, height: 40, backgroundColor: 'white', borderRadius: 1 }}>
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
                        <FormControl sx={{width:{xs:"100%",sm:"auto"}, minWidth: { xs: "100%", sm: 150 }, height: 40, backgroundColor: 'white', borderRadius: 1 }}>
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
                <Typography align="right">
                    Independent
                    <Switch checked={isIndependent} onChange={onIndependentToggle} color="secondary"/>
                </Typography>
                <Button variant="contained" color="secondary" onClick={onClearFilters} sx={{ whiteSpace: "nowrap",width:{xs:"100%",sm:"auto"},fontSize:{xs:"13px"} }}>Clear Filter</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;