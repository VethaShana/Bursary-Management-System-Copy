import {
  Container,
  Paper,
  Grid,
  Button,
  Chip,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import TimerIcon from "@material-ui/icons/Timer";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  paper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: "' '",
      position: "absolute",
      display: "block",
      backgroundColor: theme.palette.primary.main,
      width: "100%",
      height: "4px",
      top: 0,
      left: 0,
    },
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  footer: {
    margin: theme.spacing(2) + "px 0",
  },
}));

function Form() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h3" color="initial">
          Bursary Application
        </Typography>
        <Typography variant="subtitle1" color="initial" gutterBottom>
          University of Jaffna
        </Typography>
        <Chip
          className={classes.chip}
          label="Deadline: 10/01/2020"
          icon={<TimerIcon />}
          color="secondary"
          size="small"
        />
      </header>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="subtitle2" color="initial" gutterBottom>
              Please read the following instructions before filling the form.
            </Typography>
            <Typography variant="body2" color="initial">
              Particulars regarding sources of income of should be stated in
              full. Particulars of income supplied by you will be checked with
              relevant officers and the Department of Inland revenue. <br />
              <br />
              No fields should be left blank. If you have nothing to state it
              should be stated N/A ,Incomplete applications or applications that
              do not reach this office before closing date or applications that
              are not channeled through Grama Sevaka and Divisional Secretary
              will be rejected. <br /> <br />
              This application should be duly perfected and handed over to Grama
              Sevaka, so as to reach this office on or before 30th of September
              2020 the Grama Sevaka will forward the Application to the Division
              Secretary as specified in cage 11. As the application has to be
              returned by registered post and envelop of 9”x 4” in size with
              stamps to the appropriate value pasted should be handed over to
              the Grama Sevaka along with the application.The words “Bursary
              Application” should be indicated on the top left corner of the
              envelop. This application should not be handed over to this office
              personally under any circumstances. <br /> <br />
              If the Jaffna University authorities are convinced that the
              information supplied by you are incorrect, you should note that
              you could either be punished or your internal studentship will be
              cancelled. <br /> <br />
              If you are a clergy you should indicate the particulars of the
              guardian (chief priest of the temple) <br /> <br />
              If you are under the custody of a legal Guardian you should
              furnish copies of documents issued by a court of law to that
              effect. <br /> <br />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="registration-number"
              label="Registration Number"
              placeholder="20XX/CSC/XXX"
              helperText="If not provided, contact Welfare Dept."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="index-no"
              label="Index Number"
              placeholder="S XXXXX"
              helperText="If not provided, contact your relevant Dept."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField id="nic" label="NIC" placeholder="XXXXXXXXXV" />
          </Grid>

          <Grid item xs={12} sm={2} md={1}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="title">Title</InputLabel>
              <Select labelId="title" id="title" value="Mr" label="title">
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Mrs">Miss</MenuItem>
                <MenuItem value="Rev">Miss</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10} md={5}>
            <TextField
              id="name-with-initials"
              label="Name with Initials"
              placeholder="J. Doe"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="full-name"
              label="Full Name"
              placeholder="Eg: John Doe"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="street"
              label="Street"
              placeholder="Eg: Colombo street"
              helperText="State your permanent Address here."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField id="city" label="City" placeholder="Eg: Kandy" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="district">District</InputLabel>
              <Select
                labelId="district"
                id="district"
                value="Kandy"
                label="District"
              >
                <MenuItem value="Kandy">Kandy</MenuItem>
                <MenuItem value="Colombo">Colombo</MenuItem>
                <MenuItem value="Jaffna">Jaffna</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="mobile-no"
              label="Mobile Number"
              placeholder="Eg: 07X XXXX XXX"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="grama-sevaka-division">
                Grama-Sevaka Division
              </InputLabel>
              <Select
                labelId="grama-sevaka-division"
                id="grama-sevaka-division"
                value="Pathadumbara"
                label="Grama-Sevaka Division"
              >
                <MenuItem value="Pathadumbara">Pathadumbara</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="grama-sevaka-division-no">
                Grama-Sevaka Division No.
              </InputLabel>
              <Select
                labelId="grama-sevaka-division-no"
                id="grama-sevaka-division-no"
                value="#GS10119"
                label="Grama-Sevaka Division No."
              >
                <MenuItem value="#GS10119">#GS10119</MenuItem>
                <MenuItem value="#GS10120">#GS10120</MenuItem>
                <MenuItem value="#GS10119">#GS10119</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="gce-al-district">
                G. C. E. A/L Exam. District
              </InputLabel>
              <Select
                labelId="gce-al-district"
                id="gce-al-district"
                value="Kandy"
                label="G. C. E. A/L Exam. District"
              >
                <MenuItem value="Kandy">Kandy</MenuItem>
                <MenuItem value="Colombo">Colombo</MenuItem>
                <MenuItem value="Jaffna">Jaffna</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="z-score"
              label="Z-Score"
              type="number"
              placeholder="2.9"
            />
          </Grid>
          <Grid item sm={5}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="course-of-study">Course of Study</InputLabel>
              <Select
                labelId="course-of-study"
                id="course-of-study"
                value="Computer Science"
                label="Course of Study"
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Biological Science">
                  Biological Science
                </MenuItem>
                <MenuItem value="Applied Mathematics">
                  Applied Mathematics
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <footer className={classes.footer}>
        <Typography variant="body2" color="initial" align="center">
          &copy; copyrights University of Jaffna, 2020.
        </Typography>
      </footer>
    </Container>
  );
}

export default Form;
