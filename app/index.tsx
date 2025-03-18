"use client";
import React from "react";
import { useState, useEffect } from "react";

const index = () => {
  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setPeople(data.people);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((id_data) => {
        console.log(id_data);
        setId(id_data.username);
      });
  });

  return (
    <div className="">
      {message}
      {people.map((eachPerson, index) => (
        <div key={index}>
          <p>{eachPerson}</p>
        </div>
      ))}
      <p>{people[0]}</p>
      <p>{id}</p>

      <button> </button>
    </div>
  );
};

export default index;
