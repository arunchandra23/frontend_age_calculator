import React, { useState, useEffect } from "react";
import api from "../../api";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "../Modal/Modal";
import "./Home.css";
import "../../Utils/Colors.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Table from "../../Utils/Table/Table";

const Home = () => {
  const [msg, setMsg] = useState("");
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    getRequests()
  }
  , []);

  const getRequests=async ()=>{
    let response
    try{
       response=await api.get(`getRequests`)
       setRequests(response.data)
       console.log(response.data);
    }
    catch(err){
      return Promise.reject(err)
    }
    
  }

  const handleSubmit=async(name)=>{
    let response
    try{
       response=await api.get(`addRequest?name=${name}&dob=${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`)
       console.log(response.data)
       setMsg(`AGE: ${response.data.years} years , ${response.data.months} months, ${response.data.days} days`)
       setIsModalVisible(true)
       getRequests()
       setIsVisible(false)

    }
    catch(err){
      setMsg(`ERROR: ${err.message}`)
      setIsModalVisible(true)

      return Promise.reject(err)
    }
  }

  return (
    <div className="home-container">
      {isModalVisible ? (
        <Modal handleClose={setIsModalVisible} text={msg} />
      ) : null}
      <div className="form-container">
        <div className="layer">
          <div className="home-form ui container">
            <div className="home-form-segment ui raised segment ">
            <Formik
                initialValues={{
                  name: ""
                }}
                validate={(values) => {
                  console.log(values);
                  const errors = {};
                 
                  if (!values.name) {
                    errors.name = "Enter your name";
                  }
                  
                  return errors;
                }}
                onSubmit={(values)=>{handleSubmit(values.name)}}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form className="ui form">
                    <label>Name</label>
                    <Field className="field" type="text" name="name" />
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="name"
                      component="div"
                    />
              <label>Date of birth</label>

           <DatePicker
              dateFormat='dd/MM/yyyy'
                className="field"
                selected={date}
                onChange={(date: Date) => setDate(date)}
              />
              <br />
              <br />
                    <button  className="ui button" type="submit">
                    Show Age
                    </button>
                  </Form>
                )}
              </Formik>
              {/* <label>Name</label><br />
              <input onChange={(e)=>{
                setName(e.target.value);
              }} type="text" className="ui input"/>
              <br />
              <br /> */}
              
              
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="bookings-button">
        <button
          style={{ alignSelf: "center" }}
          className=" ui labeled icon button"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          View requests
          {isVisible ? (
            <i className="chevron down icon"></i>
          ) : (
            <i className="chevron up icon"></i>
          )}
        </button>
      </div>

      <br></br>
      <div className="table-container">
        {isVisible ? (
          <div>
            {requests.length !== 0 ? (
              <Table rowData={requests} />
            ) : (
              <div className="ui segments">
                <div className="ui segment">No requests</div>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <br></br>
    </div>
  );
};

export default Home;
