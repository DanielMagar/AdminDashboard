import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import EmailChip from "./EmailChip";
import AutoCompOnApiCall from "./AutoCompOnApiCall";

const data = [
  {
    name: "daniel",
    email: "daniel@gmail.com",
  },
  {
    name: "jeevan",
    email: "jeevan@gmail.com",
  },
  {
    name: "amit",
    email: "amit@gmail.com",
  },
  {
    name: "ram",
    email: "ram@gmail.com",
  },
];

const Dashboard = () => {
  const [email, setEmail] = useState(data[0].email);
  const [multiEmail, setMultiEmail] = useState([]);

  const handleChange = (newValue) => {
    console.log("Frim auto comp", newValue);
    setEmail(newValue.email);
    setMultiEmail(newValue);
  };
  // useEffect(() => {
  //   console.log("The email we want");

  //   console.log(email);
  //   console.log(multiEmail);
  // }, [handleChange]);

  // handle emial change

  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [emails, setEmails] = useState([]);

  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var email = value.trim();
      console.log("Lets check Emails:");
      console.log(email);

      if (email) {
        setItems([...items, email]);
        setValue("");
      }
    }
  };
  const handleChangeEmail = (evt) => {
    setValue(evt.target.value);
    setError(null);
  };

  useEffect(() => {
    console.log("Before error setting", items);
    let error = null;

    for (let i in items) {
      if (!isEmail(items[i])) {
        console.log("This is not email bro:", items[i]);
        error = `${items[i]} is not a valid email address.`;
      }
    }
    if (error) {
      setError(error);
    }
  }, [items]);
  // useEffect(() => {
  //   console.log("Value after timing:", emails);
  // }, [handleChangeEmail]);
  //Delete selected Email
  const handleDelete = (item) => {
    setItems(items.filter((i) => i !== item));
    setError(null);
  };

  function isValid(email) {
    let error = null;

    // if (isInList(email)) {
    //   error = `${email} has already been added.`;
    // }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      setError(error);

      return false;
    }

    return true;
  }

  function isInList(email) {
    return items.includes(email);
  }
  function isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }
  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              // freeSolo
              options={data}
              getOptionLabel={(option) => option.name}
              defaultValue={data.find((v) => v.name[0])}
              renderInput={(params) => (
                <TextField {...params} label="freeSolo" />
              )}
              onChange={(event, newValue) => {
                handleChange(newValue);
              }}
            />
          </Stack>
        </Box>
        Email that you wanted to display is :{" "}
        {email
          ? email
          : multiEmail.map((data) => {
              return data.email;
            })}
      </Box>
      <Box>
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            multiple={true}
            id="free-solo-demo"
            freeSolo
            options={data}
            getOptionLabel={(option) => option.name}
            defaultValue={[data.find((v) => v.name[0])]}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
            onChange={(event, newValue) => {
              handleChange(newValue);
            }}
          />
        </Stack>
      </Box>
      <div>Email Chips</div>
      <Box>
        {items.map((item, idx) => (
          <div
            className={`${
              !isEmail(items[idx]) ? "tag-item-error" : "tag-item"
            }`}
            // className={"tag-item"}
            key={idx}
          >
            {item}
            <button
              type="button"
              className="button"
              onClick={() => handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          className={"input " + (error && " has-error")}
          placeholder="Type or paste email addresses and press `Enter`"
          value={value}
          onChange={handleChangeEmail}
          onKeyDown={handleKeyDown}
        />
        {error && <p className="error">{error}</p>}
        {/* <EmailChip /> */}
      </Box>
      <div>
        API Call on Matching characters with MUI
        <AutoCompOnApiCall />
      </div>
    </>
  );
};

export default Dashboard;
