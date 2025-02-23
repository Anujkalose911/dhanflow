import React, { useEffect } from "react";

const MyAliceChat = () => {
  useEffect(() => {
    const div = document.createElement("div");
    div.id = "myAliceWebChat";
    document.body.appendChild(div);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widget.myalice.ai/index.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.MyAliceWebChat) {
        window.MyAliceWebChat.init({
          selector: "myAliceWebChat",
          number: "918660993875",
          message: "",
          color: "#25D366",
          channel: "wa",
          boxShadow: "none",
          text: "Start Chatting",
          theme: "light",
          position: "right",
          mb: "20px",
          mx: "20px",
          radius: "20px",
        });
      }
    });

    return () => {
      document.body.removeChild(div);
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default MyAliceChat;
