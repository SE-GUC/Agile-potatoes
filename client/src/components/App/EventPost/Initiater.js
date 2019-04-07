import React from 'react'
import axios from 'axios'

const Initiater =() => {
 
    var post = axios.get("http://localhost:3001/api/event/Post/5ca0e380b487d0228811cf43");
   
     
    const event =()=> {
            return(
                <div class="row">
                <div class="col-sm-4">
                  <p>Information</p>
                  <p>{post.name}</p>
                  <p>{post.partner}</p>
                  
                  <p>price {post.price}</p>
                  <p>{post.city}</p>
                  <p>{post.location}</p>
                  <p>{new Date(post.eventDate).toLocaleDateString()}</p>
                  <p>{post.speakers.map(speaker => <li>{speaker}</li>)}</p>
                  <p>{post.topics.map(topic => <li>{topic}</li>)}</p>
                  <p>{post.attendees.map(attendee => <li>{attendee}</li>)}</p>
                  <p>{this.eventType}</p>
                  
                  
                  
                </div>
                <div class="col-sm-8">
                  <p>{post.description}</p>
      
                  <p>ADMIN COMMENT SECTION</p>
                  <p>{post.commentsByAdmin.map(admin => <li>{admin.text} by {admin.author}</li>)}</p>
                  <p>PARTNER COMMENT SECTION</p>
                  <p>{post.commentsByPartner.map(partner => <li>{partner.text} by {partner.author}</li>)}</p>
      
                  
                </div>
              </div>
            )
        }
   
    return (
      <div >
        {event}
      </div>
    )
}

export default Initiater
