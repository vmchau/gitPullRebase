import React from "react";
import Book from "./Book.jsx";
import BookedModal from "./BookedModal.jsx";
import axios from "axios";
import $ from "jquery";

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showModal: false
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  onClickHandler(input) {
    var artistName = this.props.artist.username;

    // -----!!! The user name is hardcoded, please update it with current clicking user name ---
    var hardCodedUser = "Aygerim Test";
    console.log("Message has been sent: ", input);
    $.ajax({
      url: "/user",
      method: "POST",
      data: JSON.stringify({
        artist: artistName,
        message: input,
        user: hardCodedUser
      }),
      contentType: "application/json",
      success: data => {
        console.log("succeeded", data);
      },
      error: (xhr, status, error) => {
        console.log("err", xhr, status, error);
      }
    });
  }

  render() {
    const BookModal = this.state.showModal ? (
      <Book onClick={this.onClickHandler} />
    ) : (
      <BookedModal />
    );  

    return (
      <div className="artist-container">
        <img
          className="artist-image"
          src={this.props.artist.image}
          alt="Artist Pic"
          onClick={() => this.props.setArtist(this.props.artist.username)}
        />
        <div className="artist-text">
          <div onClick={() => this.props.setArtist(this.props.artist.username)}>
            {this.props.artist.username}
          </div>
          <a href={this.props.artist.uri}>
            <div>Profile</div>
          </a>
          <input
            className="bookBtn"
            type="submit"
            value="Book Now"
            onClick={this.handleOpenModal.bind(this)}
            data-toggle="modal"
            data-target="#bookedModal"
          />
          {BookModal}
        </div>
      </div>
    );
  }
}
export default Artist;
