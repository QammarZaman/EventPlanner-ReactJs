import { firestore } from "config/firebase";
import { useAuthContext } from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";

const MyEvents = () => {
  const { eventCreater } = useAuthContext();
  const [event, setEvent] = useState({});
  const [documents, setDocuments] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingDelete, setIsProcessingDelete] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});
  const onChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    setSelectedTime({
      time: value,
      date: dateString,
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEvent((s) => ({ ...s, [name]: value }));
  };

  const fetchDocuments = async () => {
    let array = [];

    const q = query(
      collection(firestore, "events"),
      where("createrBy.uid", "==", eventCreater.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
      // doc.data() is never undefined for query doc snapshots
      // console.log(data);
    });

    setDocuments(array);
  };

  useEffect(() => {
    fetchDocuments();
  }, [eventCreater]);

  const handleUpdate = async () => {
    // console.log(event)

    let formData = { ...event };
    // eslint-disable-next-line
    formData.description = formData.description;
    formData.dateModified = serverTimestamp();
    formData.modifiedBy = {
      email: eventCreater.email,
      uid: eventCreater.uid,
    };
    setIsProcessing(true);
    try {
      await setDoc(doc(firestore, "events", formData.id), formData, {
        merge: true,
      });
      window.toastify("Event has been successfully updated", "success");

      let newDocuments = documents.map((doc) => {
        if (doc.id === event.id) return event;
        return doc;
      });

      setDocuments(newDocuments);
    } catch (err) {
      console.error(err);
      window.toastify(
        "Something went went wrong, Event isn't updated",
        "error"
      );
    }
    setIsProcessing(false);
  };

  const handleDelete = async (event) => {
    setIsProcessingDelete(true);

    try {
      await deleteDoc(doc(firestore, "events", event.id));
      window.toastify("event has been successfully deleted", "success");

      let newDocuments = documents.filter((doc) => {
        return doc.id !== event.id;
      });
      setDocuments(newDocuments);
      setIsProcessingDelete(false);
    } catch (err) {
      console.error(err);
      window.toastify("Something went wrong", "error");
    }
  };

  return (
    <>
      <section class="ticket-section section-padding">
        <div class="section-overlay"></div>

        <div class="container">
          <div class="row">
            <div class="col-lg-11 col-11 mx-auto">
              <div class="custom-form ticket-form mb-5 mb-lg-0">
                <h2 class="text-center mb-4">All Events</h2>
                <div class="ticket-form-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Date</th>
                          <th scope="col">Location</th>
                          <th scope="col">Description</th>
                          <th scope="col">Attendees</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((event, i) => {
                          let { attendees } = event;
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>{event.title}</td>
                              <td>{event.dateTime}</td>
                              <td>{event.location}</td>
                              <td>{event.description}</td>
                              <td>{attendees.length > 0 ? attendees : 0}</td>
                              <td>
                                <button
                                  className="btn btn-info btn-sm me-1 mb-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editModal"
                                  onClick={() => {
                                    setEvent(event);
                                  }}
                                >
                                  {!isProcessing ? (
                                    "Edit"
                                  ) : (
                                    <div className="spinner-border spinner-border-sm"></div>
                                  )}
                                </button>
                                {"/ "}
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    handleDelete(event);
                                  }}
                                >
                                  {!isProcessingDelete ? (
                                    "Delete"
                                  ) : (
                                    <div className="spinner-border spinner-border-sm"></div>
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Update event</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h2 class="text-center mb-4">Update Event</h2>

              <div class="ticket-form-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-12">
                    <input
                      type="text"
                      name="title"
                      id="ticket-form-name"
                      class="form-control mb-3"
                      placeholder="Title"
                      required
                      value={event.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <h6>Choose Event Date & Time</h6>

                <div class="row">
                  <div class="col-lg-12 col-md-12 col-12">
                    <DatePicker
                      className="form-check form-control mb-3"
                      showTime
                      onChange={onChange}
                      value={event.time}
                    />
                  </div>
                </div>

                <input
                  type="text"
                  name="location"
                  id="ticket-form-number"
                  class="form-control mb-3"
                  placeholder="Location"
                  required
                  onChange={handleChange}
                  value={event.location}
                />

                <textarea
                  name="description"
                  rows="3"
                  class="form-control mb-3"
                  id="ticket-form-message"
                  placeholder="Description"
                  onChange={handleChange}
                  value={event.description}
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn custom-btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn custom-btn"
                  onClick={handleUpdate}
                >
                  Update Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;
