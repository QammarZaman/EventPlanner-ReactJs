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
import React, { useEffect, useState } from "react";

const AllEvents = () => {
  const { eventCreater } = useAuthContext();
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    let array = [];

    const q = query(collection(firestore, "events"));

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
  }, []);

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
                                >
                                  Join
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
    </>
  );
};

export default AllEvents;
