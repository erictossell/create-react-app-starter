
import { Button, useTheme, Box } from '@mui/material';

function ComingSoonButton() {
  const theme = useTheme();

  return (
    <Box flexShrink={0}> {/* Prevent the button from shrinking */}
      <Button
        variant="outlined"
        sx={{
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          backgroundColor: theme.palette.background.default,
          whiteSpace: 'nowrap',
          marginTop: theme.spacing(2),
          margin: theme.spacing(1),
        }}
      >
        Coming soon
      </Button>
    </Box>
  );
}

export default ComingSoonButton;

