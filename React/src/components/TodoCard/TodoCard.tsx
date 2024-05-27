import {
  Card,
  Box,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

// define the props
interface TodoCardProps {
  id: number | undefined;
  createdAt: string;
  dueDate?: string;
  title: string;
  task: string;
  isComplete: boolean;
  colourHexCode?: string; // optional
  deleteOnClick: (id: number | undefined) => void;
  handleEdit: (id: number | undefined) => void;
}

const TodoCard = ({
  id,
  createdAt,
  dueDate,
  title,
  task,
  isComplete,
  colourHexCode,
  deleteOnClick,
  handleEdit,
}: TodoCardProps) => {
  const theme = useTheme();

  const colourCatergorisation = colourHexCode;

  console.log(colourHexCode);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        rowGap: 1,
        marginBottom: 2,
        padding: 2,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: colourCatergorisation, width: "2px" }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.common.white,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.common.white, display: "block" }}
          >
            {task}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.common.white,
              display: "block",
              marginBottom: "-3px",
            }}
          >
            Created on {createdAt}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.common.white, display: "block" }}
          >
            Due by {dueDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              aria-label="edit"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              size="small"
              onClick={() => handleEdit(id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              size="small"
              onClick={() => deleteOnClick(id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="mark as done"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              size="small"
              onClick={() => alert("fix me")}
            >
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default TodoCard;
