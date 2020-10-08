import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Service = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>
            How to reset forgotton password ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Step 1 : Go to Account in top right corner and click on Login /
            Create Account
            <br />
            Step 2 : Above the sign-in or sign-up button click on forgot
            password ?
            <br />
            Step 3 : Provide the email which you gave during signup.
            <br />
            Step 4 : Check You registered mail for reset link!
            <br />
            Step 5 : From the Mail you recieved click on reset password button
            <br />
            Step 6 : Enter new password and confirm password, that's it your
            password is changed and you are auto logged in.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'>
          <Typography className={classes.heading}>How Lexa Works</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lexa is a online ecommerce platform where products are sold directly
            from manufacturers to customers
            <br />
            How do we make profit from this ?
            <br />
            On every order we charge 2% that is 2rs for 100rs item.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'>
          <Typography className={classes.heading}>
            I own manufacturing unit how can i sell my products ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lexa has a separate portal for its community people.
            <br />
            You can register yourself{" "}
            <a href='https://lexa-community.netlify.app/auth'>here</a> as
            manufacturer
            <br />
            Hope we see you soon
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Service;
