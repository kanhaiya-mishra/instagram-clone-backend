// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import DBlayer from '../../dblayer';
import { useHistory } from 'react-router-dom';

export default function AutocompleteSearch() {
   const [open, setOpen] = React.useState(false);
   const [options, setOptions] = React.useState([]);
   const loading = open && options.length === 0;
   const history = useHistory();

   React.useEffect(() => {
      const searchBox = document.getElementById('autocomplete-search');
      const debouncedSearch = _.debounce(function (event) {
         if (event.target.value.length > 1) {
            DBlayer.getAllUsersByUsername(event.target.value)
               .then((result) => {
                  let usernameArray = [];
                  result.data.forEach(item => {
                     usernameArray.push({ name: item.username });
                  })
                  setOptions(usernameArray);
               })
         }
      })
      searchBox.addEventListener('keydown', debouncedSearch, 500);
      return () => {
         const searchBox = document.getElementById('autocomplete-search');
         searchBox.removeEventListener('keydown', debouncedSearch);
      }
   }, []);

   React.useEffect(() => {
      let active = true;

      if (!loading) {
         return undefined;
      }

      return () => {
         active = false;
      };
   }, [loading]);

   React.useEffect(() => {
      if (!open) {
         setOptions([]);
      }
   }, [open]);

   function redirectToUserProfile(username) {
      debugger;
      history.push(`/profile/${username}`);
   }

   return (
      <Autocomplete
         id="autocomplete-search"
         style={{ width: 300 }}
         open={open}
         onOpen={() => {
            setOpen(true);
         }}
         onClose={() => {
            setOpen(false);
         }}
         getOptionSelected={(option) => redirectToUserProfile(option.name)}
         getOptionLabel={(option) => option.name}
         options={options}
         loading={loading}
         renderInput={(params) => (
            <TextField
               {...params}
               label="Search by username"
               variant="outlined"
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={16} /> : null}
                     </React.Fragment>
                  ),
               }}
            />
         )}
      />
   );
}
