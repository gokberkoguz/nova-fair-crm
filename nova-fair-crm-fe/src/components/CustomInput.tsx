import { VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { colors } from "../theme.tsx";

const CustomInput: React.FC<{
  isIconActive: boolean;
  label: string;
  placeholder: string;
  value: string; // Add value prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  name: string; // Add name prop
}> = ({ isIconActive, label, placeholder, value, onChange, name }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography color="white" pb={1}>
          {label}
        </Typography>
        <Paper
          sx={{
            background: colors.input[500],
            width: "100%"
          }}
        >
          <InputBase
            placeholder={placeholder}
            fullWidth
            value={value} // Set value prop
            onChange={onChange} // Set onChange prop
            name={name} // Set name prop
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: "5px",
            }}
            endAdornment={
              isIconActive && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton edge="end">
                    <VisibilityOff />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomInput;
