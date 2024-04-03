import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { apiHost } from "../apiLoc";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function additionalTabWiseAttributes(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserCard({ customer }) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Name
        </Typography>
        <Typography component="div">{customer.name}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Email
        </Typography>
        <Typography component="div">{customer.email}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Phone
        </Typography>
        <Typography component="div">{customer.phoneNumber}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Address
        </Typography>
        <Typography component="div">
          {customer.location}, {customer.city}, {customer.state},{" "}
          {customer.country}, {customer.pincode}
        </Typography>
      </CardContent>
    </Card>
  );
}

const CourierDetailModal = (props) => {
  const auth = useSelector((state) => state.auth);
  const depId = auth.department._id;
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const initValues = {
    item: props.data && props.data.item,
    weight: props.data && props.data.weight,
    status: props.data && props.data.status[`${depId}`],
  };

  const editCourierSchema = yup.object().shape({
    item: yup.string().required("required"),
    weight: yup.string().required("required"),
    status: yup.string().required("required"),
  });
};

export default CourierDetailModal;
