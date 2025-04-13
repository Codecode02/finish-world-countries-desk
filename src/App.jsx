import { useEffect, useState } from 'react';
import './App.css';
import Header from './assets/components/Header/Header';
import CountriesList from './assets/components/Table/Table';
import { Box, Grid } from "@mui/material";
function App() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubregion] = useState("");
  const [isIndependent, setIsIndependent] = useState(false);
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => setCountries(data))
  }, [])

  const getSubregions = () => {
    const filtered = countries.filter(c => c.region === region && c.subregion);
    const unique = [...new Set(filtered.map(c => c.subregion))];
    return unique.sort();
  };

  function handleClearFilters() {
    setSearch("");
    setRegion("");
    setSubregion("");
    setIsIndependent(false);
  }

  const filterCountries = countries.filter((item) => {
    const inputText = search.toLowerCase();

    const name = item.name?.common?.toLowerCase() || "";
    const capital = item.capital?.[0]?.toLowerCase() || "";
    const language = item.languages ? Object.values(item.languages).join(" ").toLowerCase() : "";
    const currencyName = item.currencies ? Object.values(item.currencies).map(item => item.name).join(" ").toLowerCase() : "";
    const currencySymbol = item.currencies ? Object.values(item.currencies).map(item => item.symbol).join(" ").toLowerCase() : "";
    const area = item.area?.toString() || "";
    const sameName = capital.includes(inputText) || name.includes(inputText) || language.includes(inputText) || currencyName.includes(inputText) || currencySymbol.includes(inputText) || area.includes(inputText);

    const sameRegion = region ? item.region === region : true;
    const sameSubRegion = subregion ? item.subregion === subregion : true;
    const independent = isIndependent ? item.independent === true : true;


    return sameName && sameRegion && sameSubRegion && independent;
  })

  return (
    <>
      <Box >
        <Grid>
          <Grid item xs={2}>
            <Header search={search}
              onSearchChange={setSearch}
              region={region}
              onRegionChange={(value) => {
                setRegion(value);
                setSubregion("");
              }}
              subregion={subregion}
              onSubregionChange={setSubregion}
              subregions={getSubregions()}
              isIndependent={isIndependent}
              onIndependentToggle={() => setIsIndependent(!isIndependent)}
              onClearFilters={handleClearFilters}
            />
          </Grid>
          <Grid item xs={8}>
            <CountriesList countries={filterCountries} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
