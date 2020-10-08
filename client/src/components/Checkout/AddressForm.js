import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm({ ...props }) {
  const { name, address, city, state, postalCode } = props.Getters;
  const {
    setName,
    setAddress,
    setCity,
    setState,
    setPostalCode,
  } = props.Setters;
  const states = props.states;

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required
            id='name'
            name='name'
            label='Name'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            required
            id='address'
            name='address'
            label='Address'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            required
            id='city'
            name='city'
            label='City'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id='standard-select-currency-native'
            select
            label='select State'
            value={state}
            onChange={(ev) => setState(ev.target.value)}
            SelectProps={{
              native: true,
            }}>
            {states.map((option) => (
              <option key={option.code} value={option.name}>
                {option.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={postalCode}
            onChange={(ev) => setPostalCode(ev.target.value)}
            required
            id='zip'
            name='zip'
            label='Postal code'
            fullWidth
            autoComplete='shipping postal-code'
          />
        </Grid>
      </Grid>
    </>
  );
}
