/* eslint-disable no-unused-vars */
import styled from "styled-components";
import React from "react";
import Link from "next/link";
import Trip from "./Trip";
import { TextSmall } from "../../Text/Body";

const Text = styled(TextSmall)`
  font-size: 20px;
  margin: 5px 0;
`;

const RecentTrips = (props) => {
  console.log(props.trips);
  return (
    <div className="trips my-4 flex flex-col justify-between">
      <Text>Your Recent Trips</Text>
      {props.trips && props.trips.map((trip) => (
      <Trip key={trip._id} trip={trip} />
      ))}
      
      <Link href="/trip">
        <a>
        <TextSmall color="#2699fb">See All Trips</TextSmall>
        </a>
      </Link>
    </div>
  );
};

export default RecentTrips;
