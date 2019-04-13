import React, { Component } from "react";
import Initiater from "./Initiater";

class Event extends Component {
  state = {
    name: "random",
    description:
      "doing random sasdukhasd aksdj askjd;l aksl; k;lk ;alskd ;laskd ;lsad .askd /askd /lsakd l;askd ;lask ;lak ;laskdl;askl;daskdl;kasdka;sdkas;ldk;lk ajdflkajfklasj jk jkl jlkajf l;jhf;asdjflkdsajfklds ;aj;klf jdska;lfjs dkljf ;kldsj;kldsj kljklj d;kl jasdlkfjsdf;kljsdafkj",
    price: 11,
    city: "cairo",
    location: "String,",
    eventDate: "11/11/2001",
    postDate: "11/11/2001",
    eventStatus: "Approved",
    remainingPlaces: 1,
    eventType: "public",
    url: "nil",
    speakers: ["populate this", "d"],
    topics: ["pd"],
    feedbacks: ["pd"],
    partner: "populate this",
    attendees: ["populate this"],
    commentsByAdmin: [
      {
        text: "String1",
        date: "",
        author: "populate this"
      },
      {
        text: "String2",
        date: "",
        author: "populate this"
      }
    ],
    commentsByPartner: [
      {
        text: "String",
        date: "11/11/2001",
        author: "populate this"
      }
    ]
  };



  render() {
    return (
      <body>
        <Initiater />
      </body>
    );
  }
}

export default Event;
