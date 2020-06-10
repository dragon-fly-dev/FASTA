/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import styled from "styled-components";
import { toast } from "react-nextjs-toast";
import BeatLoader from "react-spinners/BeatLoader";


import Layout from "../../components/Layout";
import { SubmitButton, LinkButton, LoaderContainer } from "../../components/Buttons";
import { Input,  TextArea } from "../../components/Input";
import { SelectInput } from "../../components/MapInput";
import { TextSmall } from "../../components/Text/Body";


const AlertCardStyle = styled.div`
  border-radius: 10px;
  padding: 60px 26px 46px;
`;
const handleToast = (msg, type = "info") => toast.notify(msg, { duration: 10, type });

const MakeReport = ({getUrl, token, location}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  submitted && (document.body.style.overflow = "hidden");
  
  const { register, handleSubmit, errors, watch } = useForm({ validateCriteriaMode: "all" });
  const apiUrl = getUrl();

  console.log(location);
//  makeReport
const submitReport = async(ev) => {
  ev.location = location;
  console.log(ev, Object.keys(ev));
  setLoading(true);

try {
      const res = await fetch(`${apiUrl}/report`, {
                              method: "POST", 
                              body: JSON.stringify(ev), 
                              headers: { "Content-Type" : "application/json",
                                        "Authorization": `Bearer ${token}`}
                            });
      console.log(res.status, res);
      const response = await res.json();
      console.log(response);
      if (res.status === 200) {
      setSubmitted(true);
      } else {
        // handleToast(response.response, "error");
      }
} catch(e) {
      console.log(e, "Some error in connection, Please try again!");
      // handleToast("Error in connection", "error");
}
  setLoading(false);
}; 

  const onSubmit = (_data) => {
    const accept = (args) => {
      return args;
    };
    // console.log(data);
    submitReport(_data);
    // setSubmitted(true);
  };

  return (
    <Layout header="Make New Report" back>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
          <SelectInput placeholder="Report Type"
              name="type"
            className="mx-auto"
            options={[
              "Traffic",
              "Congestion",
              "Accident",
              "Crime",
              "Safety",
              "Armed robbery",
              "Fire",
            ]}
            ref={register({
              required: "Please select type of report",
            })}
          />
          <ErrorMessage errors={errors} name="report_type">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} className="text-xs text-red-500 text-center my-2">
                  {message}
                </p>
              ))}
          </ErrorMessage>


          <TextArea
            className="mx-auto mt-5"
            type="tel"
            name="description"
            ref={register({
              required: "Please provide a good description of the incident",
              minLength: {
                value: 3,
                message: "Please provide appropriate description"
              }
            })}
            placeholder="Description"
          />
          <ErrorMessage errors={errors} name="description">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} className="text-xs text-red-500 text-center my-2">
                  {message}
                </p>
              ))}
          </ErrorMessage>

          <p className="text-xs mt-5 text-center w-10/12 mx-auto" style={{ color: "#43A047" }}>
            Your location is recorded as part of report data.
          </p>

          {loading ?
          <LoaderContainer className="w-full mt-6">
            <BeatLoader
            size={30}
            color="#43a047"
            loading
            />
          </LoaderContainer>
          :<SubmitButton type="submit" className="w-full mt-6">
            Submit
          </SubmitButton>}
        </form>

        {submitted && (
          <div
            className="h-screen w-screen fixed top-0 left-0 z-40 flex justify-center items-center pb-16"
            style={{ backgroundColor: "#AFDEB199" }}
          >
            <AlertCardStyle className="w-10/12 bg-white">
              <img src="/images/success.svg" alt="" className="mx-auto mb-12" />
              <TextSmall className="text-center mb-6" style={{ color: "#43A047" }}>
                Your Report has been noted. <br />
                You are making the world a better place.
              </TextSmall>

              <LinkButton href="../report" className="w-10/12 mx-auto">
                continue
              </LinkButton>
            </AlertCardStyle>
          </div>
        )}
    </Layout>
  );  
};

export default MakeReport;