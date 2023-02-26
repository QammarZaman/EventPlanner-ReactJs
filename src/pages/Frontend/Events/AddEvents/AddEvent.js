import React, { useState, useRef } from "react";
import { DatePicker } from "antd";
import { useAuthContext } from "context/AuthContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "config/firebase";

const AddEvent = () => {
  const { eventCreater } = useAuthContext();
  const [eventDetails, setAddEventDetails] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const onChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    setSelectedTime({
      time: value,
      date: dateString,
    });
  };

  const formRef = useRef();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAddEventDetails((prev) => ({ ...prev, [name]: value })); //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, location, description } = eventDetails;
    let { date } = selectedTime;
    title = title.trim();
    location = location.trim();
    description = description.trim();

    if (title.length < 3) {
      return window.toastify("Please enter Event Title correctly", "error");
    }
    if (location.length < 3) {
      return window.toastify("Please enter Event Location correctly", "error");
    }
    if (description.length < 10) {
      return window.toastify(
        "Please enter Event Description correctly",
        "error"
      );
    }

    if (!date) {
      return window.toastify("Please Select Event Date correctly", "error");
    }

    let formData = {
      title,
      location,
      description,
      dateTime: date,
      createrBy: eventCreater,
      attendees: [],
    };
    formData.dateCreated = serverTimestamp();
    formData.id = window.generateRandomId();
    console.log(formData);
    createDocument(formData);
    setAddEventDetails({});
    formRef.current.reset();
  };

  const createDocument = async (formData) => {
    // setIsProcessing(true);
    try {
      await setDoc(doc(firestore, "events", formData.id), formData);
      window.toastify("Event has been successfully added", "success");
    } catch (err) {
      console.error(err);
      window.toastify("Something went wrong, Event isn't added.", "error");
    }
    // setIsProcessing(false);
  };

  return (
    <>
      <section class="ticket-section section-padding">
        <div class="section-overlay"></div>

        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-10 mx-auto">
              <form
                class="custom-form ticket-form mb-5 mb-lg-0"
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <h2 class="text-center mb-4">Add Event</h2>

                <div class="ticket-form-body">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                      <input
                        type="text"
                        name="title"
                        id="ticket-form-name"
                        class="form-control"
                        placeholder="Title"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <h6>Choose Event Date & Time</h6>

                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                      <DatePicker
                        className="form-check form-control"
                        showTime
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    name="location"
                    id="ticket-form-number"
                    class="form-control"
                    placeholder="Location"
                    required
                    onChange={handleChange}
                  />

                  <textarea
                    name="description"
                    rows="3"
                    class="form-control"
                    id="ticket-form-message"
                    placeholder="Description"
                    onChange={handleChange}
                  ></textarea>

                  <div class="col-lg-4 col-md-10 col-8 mx-auto">
                    <button type="submit" class="form-control">
                      Add Event
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEvent;
