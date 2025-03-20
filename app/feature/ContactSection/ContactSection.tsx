import React, { FC } from "react";

const ContactForm = () => {
  // state = {
  //   name: "",
  //   email: "",
  //   message: "",
  //   sent: false,
  //   buttonText: "send message",
  // };

  // resetForm = () => {
  //   this.setState({
  //     name: "",
  //     email: "",
  //     message: "",
  //     buttonText: "message sent",
  //   });
  // };

  // formSubmit = (e) => {
  //   e.preventDefault();

  //   this.setState({
  //     buttonText: "sending...",
  //   });

  //   let data = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     message: this.state.message,
  //   };

  //   axios
  //     .post("https://morning-dawn-32463.herokuapp.com/sendtome", data)
  //     .then((res) => {
  //       this.setState({ sent: true }, this.resetForm());
  //       console.log("message sent");
  //     })
  //     .catch(() => {
  //       console.log("message not Sent");
  //       alert("message not sent");
  //     });
  // };

  return (
    <div className="">
      <h3 className="text-3xl mb-3 lg:mb-12">Drop me a line</h3>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full flex flex-col gap-6 md:justify-between">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="rounded-md text-base py-4 px-4 bg-gray-100 focus:outline-none border focus:border-primary w-full"
              // onChange={(e) => this.setState({ name: e.target.value })}
              // value={name}
              // disabled
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              className="rounded-md text-base py-4 px-4 bg-gray-100 focus:outline-none border focus:border-primary w-full"
              // onChange={(e) => this.setState({ email: e.target.value })}
              // value={email}
              required
              // disabled
            />
          </div>

          <textarea
            placeholder="Your Message..."
            name="message"
            id=""
            cols={30}
            rows={5}
            className="rounded-md text-base py-4 px-4 bg-gray-100 focus:outline-none border focus:border-primary"
            // onChange={(e) => this.setState({ message: e.target.value })}
            // value={message}
            required
            // disabled
          />
        </div>

        <button className="text-white bg-gradient-to-br from-primary to-secondary rounded-md font-semibold px-4 py-2 uppercase tracking-wide ml-auto">
          <span>send message</span>
          {/* <span>message sent</span> */}
        </button>
      </form>
    </div>
  );
};

export const ContactSection: FC = () => {
  return (
    <section id="contact" className="px-6 xl:px-0 max-w-5xl mx-auto text-lg">
      {/* <h3>Contact</h3> */}

      {/* <p>
        I love to connect face-to-face around{" "}
        <span className="connect--how">
          <em>coffee</em>
        </span>{" "}
        and{" "}
        <span className="connect--how">
          <em>food</em>
        </span>
        .
      </p>
      <p className="p--socials">
        But if that&apos;s not possible, I like to virtually hang on{" "}
        <a href="https://twitter.com/optimistic_updt" target="blank">
          Twitter
        </a>{" "}
        and{" "}
        <a href="https://www.linkedin.com/in/kevgarciaf/" target="blank">
          Linkedin
        </a>
        .
      </p>
      <p>
        For graphical evidence of my life, you can jump on{" "}
        <a href="https://www.instagram.com/optimistic_update/" target="blank">
          Instagram
        </a>
        .
      </p>

      <a
        href="/images/kevin-gf-resume-2022.pdf"
        target="blank"
        className="button resume-button"
      >
        <span className="button-text">download resume</span>
      </a> */}

      <ContactForm />
    </section>
  );
};
