import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';



function CopyrightComponent(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Supernova
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default CopyrightComponent;