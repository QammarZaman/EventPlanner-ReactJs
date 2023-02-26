import React from "react";

const Interested = () => {
  return (
    <>
      <section className="contact-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h2 className="text-center mb-4">Interested?</h2>

              <nav className="d-flex justify-content-center">
                <div
                  className="nav nav-tabs align-items-baseline justify-content-center"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="nav-ContactForm-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-ContactForm"
                    type="button"
                    role="tab"
                    aria-controls="nav-ContactForm"
                    aria-selected="false"
                  >
                    <h5>Get in Touch With us</h5>
                  </button>
                </div>
              </nav>

              <div className="tab-content shadow-lg mt-5" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-ContactForm"
                  role="tabpanel"
                  aria-labelledby="nav-ContactForm-tab"
                >
                  <form
                    className="custom-form contact-form mb-5 mb-lg-0"
                    action="#"
                    method="post"
                    role="form"
                  >
                    <div className="contact-form-body">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                          <input
                            type="text"
                            name="contact-name"
                            id="contact-name"
                            className="form-control"
                            placeholder="Full name"
                            required
                          />
                        </div>

                        <div className="col-lg-6 col-md-6 col-12">
                          <input
                            type="email"
                            name="contact-email"
                            id="contact-email"
                            pattern="[^ @]*@[^ @]*"
                            className="form-control"
                            placeholder="Email address"
                            required
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        name="contact-company"
                        id="contact-company"
                        className="form-control"
                        placeholder="Company"
                        required
                      />

                      <textarea
                        name="contact-message"
                        rows="3"
                        className="form-control"
                        id="contact-message"
                        placeholder="Message"
                      ></textarea>

                      <div className="col-lg-4 col-md-10 col-8 mx-auto">
                        <button type="submit" className="form-control">
                          Send message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Interested;
