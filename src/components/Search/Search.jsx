import {styled,alpha} from  "@mui/material/styles"

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 10,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
}));

export default Search
